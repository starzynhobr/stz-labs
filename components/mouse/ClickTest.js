"use client";

import { useCallback, useRef, useState } from 'react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { ToolPanel, TestSurface, StatGrid } from './ToolFrame';
import { MouseGraphic } from './MouseGraphic';
import { getWidgetStrings, fill } from './strings';

const HIGHLIGHT_MS = 90;

const formatSeconds = (seconds) => `${seconds.toFixed(3)}s`;

const formatClock = (date, locale) => date.toLocaleTimeString(locale === 'pt' ? 'pt-BR' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
});

export default function ClickTest({ locale, content }) {
    const s = getWidgetStrings(locale);
    const [stats, setStats] = useState({ total: 0, left: 0, middle: 0, right: 0, lastDiff: null, lastName: '—' });
    const [status, setStatus] = useState({ title: s.ready, description: s.readyDesc });
    const [logs, setLogs] = useState([]);
    const [active, setActive] = useState({ left: false, middle: false, right: false });

    const previousTimeRef = useRef(null);
    const counterRef = useRef(0);

    const handleMouseDown = useCallback((event) => {
        event.preventDefault();

        const map = {
            0: { key: 'left', name: s.buttons.left },
            1: { key: 'middle', name: s.buttons.middle },
            2: { key: 'right', name: s.buttons.right },
        };
        const info = map[event.button];
        if (!info) return;

        const now = performance.now() / 1000;
        const diff = previousTimeRef.current === null ? null : now - previousTimeRef.current;
        previousTimeRef.current = now;
        counterRef.current += 1;

        setActive((current) => ({ ...current, [info.key]: true }));
        setTimeout(() => setActive((current) => ({ ...current, [info.key]: false })), HIGHLIGHT_MS);

        setStats((prev) => ({
            total: prev.total + 1,
            left: prev.left + (info.key === 'left' ? 1 : 0),
            middle: prev.middle + (info.key === 'middle' ? 1 : 0),
            right: prev.right + (info.key === 'right' ? 1 : 0),
            lastDiff: diff,
            lastName: info.name,
        }));

        setStatus({
            title: fill(s.clickedWith, { btn: info.name }),
            description: diff === null ? s.firstClick : fill(s.sinceLast, { diff: formatSeconds(diff) }),
        });

        setLogs((prev) => [
            {
                id: counterRef.current,
                key: `${counterRef.current}-${Date.now()}`,
                name: info.name,
                diff,
                time: new Date(),
            },
            ...prev,
        ].slice(0, 200));
    }, [s]);

    const reset = () => {
        counterRef.current = 0;
        previousTimeRef.current = null;
        setStats({ total: 0, left: 0, middle: 0, right: 0, lastDiff: null, lastName: '—' });
        setLogs([]);
        setStatus({ title: s.ready, description: s.readyDesc });
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            <div className="xl:col-span-7">
                <ToolPanel title={content.areaTitle} subtitle={content.areaSubtitle}>
                    <TestSurface
                        title={status.title}
                        description={status.description}
                        ariaLabel={content.areaTitle}
                        onMouseDown={handleMouseDown}
                        onContextMenu={(event) => event.preventDefault()}
                    >
                        <MouseGraphic active={active} />
                    </TestSurface>

                    <StatGrid items={[
                        { label: s.total, value: stats.total },
                        { label: s.lastButton, value: stats.lastName },
                        { label: s.interval, value: stats.lastDiff === null ? '—' : formatSeconds(stats.lastDiff) },
                        { label: s.buttons.left, value: stats.left },
                        { label: s.buttons.middle, value: stats.middle },
                        { label: s.buttons.right, value: stats.right },
                    ]} />

                    <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                        <Button onClick={reset} size="lg" className="px-8 cursor-pointer">{s.reset}</Button>
                        <Button onClick={() => setLogs([])} variant="secondary" size="lg" className="px-8 cursor-pointer">
                            {s.clearLog}
                        </Button>
                    </div>
                </ToolPanel>
            </div>

            <div className="xl:col-span-5">
                <ToolPanel title={s.logTitle} subtitle={s.logSubtitle}>
                    <div className="rounded-xl border [border-color:var(--border-strong)] overflow-hidden">
                        <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
                            <table className="w-full text-left text-xs border-collapse">
                                <thead className="sticky top-0 bg-[var(--surface-3)] z-10">
                                    <tr className="border-b [border-color:var(--border-strong)]">
                                        <th className="p-3 font-bold uppercase tracking-widest text-[var(--text-muted)]">{s.colId}</th>
                                        <th className="p-3 font-bold uppercase tracking-widest text-[var(--text-muted)]">{s.colButton}</th>
                                        <th className="p-3 font-bold uppercase tracking-widest text-[var(--text-muted)]">{s.colInterval}</th>
                                        <th className="p-3 font-bold uppercase tracking-widest text-[var(--text-muted)] text-right">{s.colTime}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="p-10 text-center text-[var(--text-muted)]">{s.noRecords}</td>
                                        </tr>
                                    ) : logs.map((log) => (
                                        <tr key={log.key} className="border-b [border-color:var(--border-subtle)]">
                                            <td className="p-3 font-mono text-[var(--text-muted)]">{log.id}</td>
                                            <td className="p-3">
                                                <span className={cn(
                                                    'inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase',
                                                    'bg-[var(--surface-3)] text-[var(--text-primary)] border [border-color:var(--border-subtle)]'
                                                )}>
                                                    {log.name}
                                                </span>
                                            </td>
                                            <td className="p-3 font-mono text-[var(--text-primary)]">
                                                {log.diff === null ? '—' : formatSeconds(log.diff)}
                                            </td>
                                            <td className="p-3 text-right font-mono text-[var(--text-muted)]">
                                                {formatClock(log.time, locale)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </ToolPanel>
            </div>
        </div>
    );
}
