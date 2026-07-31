"use client";

import { useCallback, useRef, useState } from 'react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { ToolPanel, TestSurface, StatGrid, HistoryList } from './ToolFrame';
import { MouseGraphic } from './MouseGraphic';
import { useToolHistory } from './useToolHistory';
import { getWidgetStrings, fill } from './strings';

const THRESHOLDS = [50, 80, 120];
const DEFAULT_THRESHOLD = 80;

const formatMs = (seconds) => `${Math.round(seconds * 1000)}ms`;

export default function DoubleClickTest({ locale, content }) {
    const s = getWidgetStrings(locale);
    const history = useToolHistory('double-click');
    const [threshold, setThreshold] = useState(DEFAULT_THRESHOLD);
    const [state, setState] = useState({ total: 0, suspects: 0, lastDiff: null, flagged: false });
    const [status, setStatus] = useState({ title: s.ready, description: content.areaSubtitle });
    const [active, setActive] = useState({});

    const previousRef = useRef(null);

    const handleMouseDown = useCallback((event) => {
        event.preventDefault();

        const key = { 0: 'left', 1: 'middle', 2: 'right' }[event.button];
        if (!key) return;

        const now = performance.now() / 1000;
        const diff = previousRef.current === null ? null : now - previousRef.current;
        previousRef.current = now;

        setActive({ [key]: true });
        setTimeout(() => setActive({}), 90);

        const isSuspect = diff !== null && diff * 1000 <= threshold;

        setState((prev) => ({
            total: prev.total + 1,
            suspects: prev.suspects + (isSuspect ? 1 : 0),
            lastDiff: diff,
            flagged: isSuspect,
        }));

        if (isSuspect) {
            setStatus({
                title: s.doubleDetected,
                description: fill(s.doubleDetectedDesc, { diff: formatMs(diff), threshold: `${threshold}ms` }),
            });
            history.push(fill(s.doubleDetectedDesc, { diff: formatMs(diff), threshold: `${threshold}ms` }));
        } else {
            setStatus({
                title: s.doubleClean,
                description: diff === null ? s.firstClick : fill(s.doubleCleanDesc, { diff: formatMs(diff) }),
            });
        }
    }, [history, s, threshold]);

    const reset = () => {
        previousRef.current = null;
        setState({ total: 0, suspects: 0, lastDiff: null, flagged: false });
        setStatus({ title: s.ready, description: content.areaSubtitle });
    };

    return (
        <ToolPanel title={content.areaTitle} subtitle={content.areaSubtitle}>
            <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="text-[11px] uppercase font-mono tracking-widest text-[var(--text-muted)] mr-1">
                    {s.threshold}
                </span>
                {THRESHOLDS.map((value) => (
                    <button
                        key={value}
                        type="button"
                        onClick={() => setThreshold(value)}
                        aria-pressed={threshold === value}
                        className={cn(
                            'px-3 py-1.5 rounded-lg text-sm font-semibold border transition-colors cursor-pointer',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
                            threshold === value
                                ? 'bg-[var(--accent)] text-[var(--text-on-accent)] [border-color:var(--accent)]'
                                : 'bg-[var(--surface-3)] text-[var(--text-secondary)] [border-color:var(--border-subtle)] hover:text-[var(--text-heading)]'
                        )}
                    >
                        {value}ms
                    </button>
                ))}
            </div>

            <TestSurface
                title={status.title}
                description={status.description}
                highlight={state.flagged}
                ariaLabel={content.areaTitle}
                onMouseDown={handleMouseDown}
                onContextMenu={(event) => event.preventDefault()}
            >
                <MouseGraphic active={active} />
            </TestSurface>

            <StatGrid items={[
                { label: s.total, value: state.total },
                { label: s.suspects, value: state.suspects, alert: state.suspects > 0 },
                { label: s.interval, value: state.lastDiff === null ? '—' : formatMs(state.lastDiff) },
            ]} />

            <div className={cn(
                'mt-6 p-4 rounded-xl border-l-4 bg-[var(--surface-3)] border [border-color:var(--border-subtle)]',
                state.suspects > 0 ? '[border-left-color:var(--accent)]' : '[border-left-color:var(--border-strong)]'
            )}>
                <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                    {state.suspects > 0
                        ? fill(s.verdictSuspect, { count: state.suspects })
                        : s.verdictClean}
                </p>
            </div>

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
