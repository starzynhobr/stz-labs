"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { ToolPanel, TestSurface, StatGrid, HistoryList } from './ToolFrame';
import { useToolHistory } from './useToolHistory';
import { getWidgetStrings, fill } from './strings';

const DURATIONS = [1, 5, 10, 30, 60];

export default function CpsTest({ locale, content }) {
    const s = getWidgetStrings(locale);
    const history = useToolHistory('cps');
    const [duration, setDuration] = useState(5);
    const [phase, setPhase] = useState('idle');
    const [clicks, setClicks] = useState(0);
    const [remaining, setRemaining] = useState(5);

    const startRef = useRef(0);
    const frameRef = useRef(null);
    const clicksRef = useRef(0);
    // A fase vive num ref além do estado: uma rajada de cliques no mesmo tick
    // enxergaria o valor antigo do closure e reiniciaria a contagem.
    const phaseRef = useRef('idle');
    const setPhaseSafe = (value) => {
        phaseRef.current = value;
        setPhase(value);
    };

    useEffect(() => {
        if (phase !== 'running') return undefined;

        const tick = () => {
            const elapsed = (performance.now() - startRef.current) / 1000;
            const left = Math.max(duration - elapsed, 0);
            setRemaining(left);

            if (left <= 0) {
                setPhaseSafe('done');
                return;
            }
            frameRef.current = requestAnimationFrame(tick);
        };

        frameRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frameRef.current);
    }, [duration, phase]);

    useEffect(() => {
        if (phase !== 'done') return;
        const score = (clicksRef.current / duration).toFixed(2);
        history.push(`${score} CPS · ${duration}s`);
        // A dependência de history é estável; incluí-la reexecutaria a cada push.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phase, duration]);

    const handleMouseDown = useCallback((event) => {
        event.preventDefault();
        if (event.button !== 0) return;
        if (phaseRef.current === 'done') return;

        if (phaseRef.current === 'idle') {
            startRef.current = performance.now();
            clicksRef.current = 1;
            setClicks(1);
            setPhaseSafe('running');
            return;
        }

        clicksRef.current += 1;
        setClicks(clicksRef.current);
    }, []);

    const reset = () => {
        cancelAnimationFrame(frameRef.current);
        clicksRef.current = 0;
        setClicks(0);
        setRemaining(duration);
        setPhaseSafe('idle');
    };

    const selectDuration = (value) => {
        cancelAnimationFrame(frameRef.current);
        setDuration(value);
        setRemaining(value);
        clicksRef.current = 0;
        setClicks(0);
        setPhaseSafe('idle');
    };

    // Só divide depois de um tempo mínimo: no primeiro instante o denominador
    // é quase zero e a média sairia absurda.
    const elapsed = phase === 'done' ? duration : duration - remaining;
    const liveCps = phase !== 'idle' && clicks > 0 && elapsed >= 0.25 ? clicks / elapsed : 0;

    const status = {
        idle: { title: s.cpsReady, description: s.cpsReadyDesc },
        running: { title: s.cpsRunning, description: s.cpsRunningDesc },
        done: {
            title: fill(s.cpsDone, { cps: liveCps.toFixed(2) }),
            description: fill(s.cpsDoneDesc, { clicks, duration }),
        },
    }[phase];

    return (
        <ToolPanel title={content.areaTitle} subtitle={content.areaSubtitle}>
            <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="text-[11px] uppercase font-mono tracking-widest text-[var(--text-muted)] mr-1">
                    {s.duration}
                </span>
                {DURATIONS.map((value) => (
                    <button
                        key={value}
                        type="button"
                        onClick={() => selectDuration(value)}
                        aria-pressed={duration === value}
                        className={cn(
                            'px-3 py-1.5 rounded-lg text-sm font-semibold border transition-colors cursor-pointer',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
                            duration === value
                                ? 'bg-[var(--accent)] text-[var(--text-on-accent)] [border-color:var(--accent)]'
                                : 'bg-[var(--surface-3)] text-[var(--text-secondary)] [border-color:var(--border-subtle)] hover:text-[var(--text-heading)]'
                        )}
                    >
                        {value}{s.seconds}
                    </button>
                ))}
            </div>

            <TestSurface
                title={status.title}
                description={status.description}
                highlight={phase === 'running'}
                ariaLabel={content.areaTitle}
                onMouseDown={handleMouseDown}
                onContextMenu={(event) => event.preventDefault()}
            >
                <div className="text-6xl md:text-7xl font-bold tracking-tighter text-[var(--accent)] tabular-nums">
                    {clicks}
                </div>
            </TestSurface>

            <StatGrid items={[
                { label: s.clicks, value: clicks },
                { label: s.timeLeft, value: `${remaining.toFixed(1)}${s.seconds}` },
                { label: s.cps, value: liveCps.toFixed(2), alert: phase === 'done' },
            ]} />

            <div className="flex justify-center mt-6">
                <Button onClick={reset} size="lg" className="px-8 cursor-pointer">{s.reset}</Button>
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
