"use client";

import { useCallback, useRef, useState } from 'react';
import { Button } from '../ui/Button';
import { ToolPanel, TestSurface, StatGrid, HistoryList } from './ToolFrame';
import { useToolHistory } from './useToolHistory';
import { getWidgetStrings, fill } from './strings';

const MAX_SAMPLES = 400;
const MIN_SAMPLES = 40;
const IDLE_RESET_MS = 900;
const COMMON_RATES = [125, 250, 500, 1000];

/** Aproxima a leitura para a taxa comercial mais próxima, quando cabe. */
const snapToCommonRate = (hz) => {
    const closest = COMMON_RATES.reduce(
        (best, rate) => (Math.abs(rate - hz) < Math.abs(best - hz) ? rate : best),
        COMMON_RATES[0]
    );
    return Math.abs(closest - hz) / closest < 0.2 ? closest : Math.round(hz);
};

export default function PollingRateTest({ locale, content }) {
    const s = getWidgetStrings(locale);
    const history = useToolHistory('polling-rate');
    const [state, setState] = useState({ samples: 0, hz: null, avgMs: null });
    const [status, setStatus] = useState({ title: s.pollingReady, description: s.pollingReadyDesc });

    const samplesRef = useRef([]);
    const lastMoveRef = useRef(0);
    const savedRef = useRef(false);

    const handleMouseMove = useCallback((event) => {
        const now = event.timeStamp || performance.now();
        const previous = lastMoveRef.current;
        lastMoveRef.current = now;

        if (!previous) return;

        const delta = now - previous;

        // Parou de mexer: recomeça a amostragem para não misturar sessões.
        if (delta > IDLE_RESET_MS) {
            samplesRef.current = [];
            savedRef.current = false;
            setState({ samples: 0, hz: null, avgMs: null });
            setStatus({ title: s.pollingReady, description: s.pollingReadyDesc });
            return;
        }

        if (delta <= 0) return;

        samplesRef.current = [...samplesRef.current, delta].slice(-MAX_SAMPLES);
        const count = samplesRef.current.length;

        if (count < MIN_SAMPLES) {
            setState({ samples: count, hz: null, avgMs: null });
            setStatus({
                title: s.pollingMeasuring,
                description: fill(s.pollingMeasuringDesc, { samples: count }),
            });
            return;
        }

        const average = samplesRef.current.reduce((sum, value) => sum + value, 0) / count;
        const hz = snapToCommonRate(1000 / average);

        setState({ samples: count, hz, avgMs: average });
        setStatus({
            title: fill(s.pollingDone, { hz }),
            description: fill(s.pollingDoneDesc, { samples: count, ms: average.toFixed(2) }),
        });

        if (!savedRef.current && count >= MAX_SAMPLES / 2) {
            savedRef.current = true;
            history.push(`${hz} Hz · ${average.toFixed(2)} ms`);
        }
    }, [history, s]);

    const reset = () => {
        samplesRef.current = [];
        lastMoveRef.current = 0;
        savedRef.current = false;
        setState({ samples: 0, hz: null, avgMs: null });
        setStatus({ title: s.pollingReady, description: s.pollingReadyDesc });
    };

    return (
        <ToolPanel title={content.areaTitle} subtitle={content.areaSubtitle}>
            <TestSurface
                title={status.title}
                description={status.description}
                highlight={state.hz !== null}
                ariaLabel={content.areaTitle}
                onMouseMove={handleMouseMove}
            >
                <div className="text-5xl md:text-6xl font-bold tracking-tighter text-[var(--accent)] tabular-nums">
                    {state.hz === null ? '—' : `${state.hz}`}
                    <span className="text-2xl ml-1">Hz</span>
                </div>
            </TestSurface>

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
