"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../ui/Button';
import { ToolPanel, TestSurface, StatGrid } from './ToolFrame';
import { getWidgetStrings, fill } from './strings';

const REVERSAL_WINDOW_MS = 220;

export default function ScrollTest({ locale, content }) {
    const s = getWidgetStrings(locale);
    const [state, setState] = useState({ steps: 0, reversals: 0, direction: '—' });
    const [status, setStatus] = useState({ title: s.scrollReady, description: s.scrollReadyDesc });
    const [flash, setFlash] = useState(false);

    const surfaceRef = useRef(null);
    const lastRef = useRef({ sign: 0, time: 0 });
    const totalsRef = useRef({ steps: 0, reversals: 0 });

    const handleWheel = useCallback((event) => {
        const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
        const delta = horizontal ? event.deltaX : event.deltaY;
        if (delta === 0) return;

        const sign = Math.sign(delta);
        const now = performance.now();
        const label = horizontal
            ? (sign > 0 ? s.right_ : s.left_)
            : (sign > 0 ? s.down : s.up);

        // Inverter o sentido dentro de uma janela muito curta é sinal de leitura
        // errada do encoder, não de o usuário ter mudado de direção.
        const isReversal = lastRef.current.sign !== 0
            && sign !== lastRef.current.sign
            && now - lastRef.current.time < REVERSAL_WINDOW_MS;

        lastRef.current = { sign, time: now };
        totalsRef.current = {
            steps: totalsRef.current.steps + 1,
            reversals: totalsRef.current.reversals + (isReversal ? 1 : 0),
        };

        setState({ ...totalsRef.current, direction: label });
        setStatus({
            title: isReversal ? s.reversalWarn : fill(s.scrollActive, { dir: label }),
            description: fill(s.scrollActiveDesc, { steps: totalsRef.current.steps }),
        });

        if (isReversal) {
            setFlash(true);
            setTimeout(() => setFlash(false), 300);
        }
    }, [s]);

    /**
     * O listener é nativo e não passivo de propósito: o React registra `wheel`
     * como passivo, então `preventDefault` no onWheel é ignorado e a página
     * rolava junto com o teste.
     */
    useEffect(() => {
        const element = surfaceRef.current;
        if (!element) return undefined;

        const onWheel = (event) => {
            event.preventDefault();
            handleWheel(event);
        };

        element.addEventListener('wheel', onWheel, { passive: false });
        return () => element.removeEventListener('wheel', onWheel);
    }, [handleWheel]);

    const reset = () => {
        lastRef.current = { sign: 0, time: 0 };
        totalsRef.current = { steps: 0, reversals: 0 };
        setState({ steps: 0, reversals: 0, direction: '—' });
        setStatus({ title: s.scrollReady, description: s.scrollReadyDesc });
    };

    return (
        <ToolPanel title={content.areaTitle} subtitle={content.areaSubtitle}>
            <TestSurface
                surfaceRef={surfaceRef}
                title={status.title}
                description={status.description}
                highlight={flash}
                ariaLabel={content.areaTitle}
            >
                <div className="text-5xl md:text-6xl font-bold tracking-tighter text-[var(--accent)] tabular-nums">
                    {state.steps}
                </div>
            </TestSurface>

            <StatGrid items={[
                { label: s.steps, value: state.steps },
                { label: s.direction, value: state.direction },
                { label: s.reversals, value: state.reversals, alert: state.reversals > 0 },
            ]} />

            <div className="flex justify-center mt-6">
                <Button onClick={reset} size="lg" className="px-8 cursor-pointer">{s.reset}</Button>
            </div>
        </ToolPanel>
    );
}
