"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../ui/Button';
import { ToolPanel, TestSurface, StatGrid, HistoryList } from './ToolFrame';
import { useToolHistory } from './useToolHistory';
import { getWidgetStrings, fill } from './strings';

const MAX_SAMPLES = 600;
const MIN_SAMPLES = 24;
const IDLE_RESET_MS = 1200;
const MAX_VALID_DELTA_MS = 40;
const COMMON_RATES = [125, 250, 500, 1000, 2000, 4000, 8000];
const CAPPED_THRESHOLD_HZ = 90;

/** Aproxima para a taxa comercial mais próxima quando a leitura chega perto. */
const snapToCommonRate = (hz) => {
    const closest = COMMON_RATES.reduce(
        (best, rate) => (Math.abs(rate - hz) < Math.abs(best - hz) ? rate : best),
        COMMON_RATES[0]
    );
    return Math.abs(closest - hz) / closest < 0.15 ? closest : Math.round(hz);
};

const median = (values) => {
    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};

export default function PollingRateTest({ locale, content }) {
    const s = getWidgetStrings(locale);
    const history = useToolHistory('polling-rate');
    const [state, setState] = useState({ samples: 0, hz: null, avgMs: null });
    const [status, setStatus] = useState({ title: s.pollingReady, description: s.pollingReadyDesc });
    const [capped, setCapped] = useState(false);

    const surfaceRef = useRef(null);
    const stampsRef = useRef([]);
    const savedRef = useRef(false);

    /**
     * O navegador agrupa os eventos de ponteiro por quadro renderizado, então
     * `mousemove` nunca passa da taxa do monitor — medir por ele daria sempre
     * ~60 Hz, independente do mouse. `getCoalescedEvents()` devolve as amostras
     * brutas que foram agrupadas naquele quadro, que é o dado real do sensor.
     */
    const handlePointerMove = useCallback((event) => {
        const raw = typeof event.getCoalescedEvents === 'function'
            ? event.getCoalescedEvents()
            : null;
        // Lista vazia acontece em alguns eventos; cair para o próprio evento
        // evita descartar a amostra em silêncio.
        const batch = raw && raw.length ? raw : [event];

        const stamps = batch.map((item) => item.timeStamp).filter((value) => value > 0);
        if (!stamps.length) return;

        const previous = stampsRef.current;
        const last = previous[previous.length - 1];

        // Pausa longa encerra a sessão de medição para não misturar amostras.
        if (last !== undefined && stamps[0] - last > IDLE_RESET_MS) {
            stampsRef.current = stamps;
            savedRef.current = false;
            setState({ samples: 0, hz: null, avgMs: null });
            setStatus({ title: s.pollingReady, description: s.pollingReadyDesc });
            return;
        }

        stampsRef.current = [...previous, ...stamps].slice(-MAX_SAMPLES);

        const deltas = [];
        for (let index = 1; index < stampsRef.current.length; index += 1) {
            const delta = stampsRef.current[index] - stampsRef.current[index - 1];
            if (delta > 0 && delta <= MAX_VALID_DELTA_MS) deltas.push(delta);
        }

        if (deltas.length < MIN_SAMPLES) {
            setState({ samples: deltas.length, hz: null, avgMs: null });
            setStatus({
                title: s.pollingMeasuring,
                description: fill(s.pollingMeasuringDesc, { samples: deltas.length }),
            });
            return;
        }

        // Mediana em vez de média: um engasgo isolado do sistema distorceria a média.
        const typical = median(deltas);
        const hz = snapToCommonRate(1000 / typical);

        // Nenhum mouse reporta a 60 Hz — a taxa mais baixa em uso é 125. Uma
        // leitura presa nessa faixa é o teto do navegador, então vale dizer isso
        // em vez de exibir o número como se fosse do mouse.
        setCapped(hz <= CAPPED_THRESHOLD_HZ);

        setState({ samples: deltas.length, hz, avgMs: typical });
        setStatus({
            title: fill(s.pollingDone, { hz }),
            description: fill(s.pollingDoneDesc, { samples: deltas.length, ms: typical.toFixed(2) }),
        });

        if (!savedRef.current && deltas.length >= MAX_SAMPLES / 2) {
            savedRef.current = true;
            history.push(`${hz} Hz · ${typical.toFixed(2)} ms`);
        }
    }, [history, s]);

    const handlerRef = useRef(handlePointerMove);

    useEffect(() => {
        handlerRef.current = handlePointerMove;
    }, [handlePointerMove]);

    useEffect(() => {
        const element = surfaceRef.current;
        if (!element) return undefined;

        // Via ref para o listener entrar uma vez só: o handler muda de identidade
        // a cada render e o efeito ficava reinscrevendo o listener sem parar.
        const listener = (event) => handlerRef.current(event);
        element.addEventListener('pointermove', listener);
        return () => element.removeEventListener('pointermove', listener);
    }, []);

    const reset = () => {
        stampsRef.current = [];
        savedRef.current = false;
        setState({ samples: 0, hz: null, avgMs: null });
        setStatus({ title: s.pollingReady, description: s.pollingReadyDesc });
    };

    return (
        <ToolPanel title={content.areaTitle} subtitle={content.areaSubtitle}>
            <TestSurface
                surfaceRef={surfaceRef}
                title={status.title}
                description={status.description}
                highlight={state.hz !== null}
                ariaLabel={content.areaTitle}
            >
                <div className="text-5xl md:text-6xl font-bold tracking-tighter text-[var(--accent)] tabular-nums">
                    {state.hz === null ? '—' : `${state.hz}`}
                    <span className="text-2xl ml-1">Hz</span>
                </div>
            </TestSurface>

            {capped && (
                <p className="mt-4 text-sm text-[var(--text-secondary)] p-4 rounded-xl bg-[var(--surface-3)] border [border-color:var(--border-subtle)] border-l-4 [border-left-color:var(--accent)]">
                    {s.pollingUnsupported}
                </p>
            )}

            <StatGrid items={[
                { label: s.estimated, value: state.hz === null ? '—' : `${state.hz} Hz`, alert: state.hz !== null },
                { label: s.samples, value: state.samples },
                { label: s.avgInterval, value: state.avgMs === null ? '—' : `${state.avgMs.toFixed(2)} ms` },
            ]} />

            <div className="flex justify-center mt-6">
                <Button onClick={reset} size="lg" className="px-8 cursor-pointer">{s.measure}</Button>
            </div>

            <HistoryList
                heading={s.historyHeading}
                emptyLabel={s.historyEmpty}
                clearLabel={s.clearLog}
                items={history.items}
                onClear={history.clear}
            />
        </ToolPanel>
    );
}
