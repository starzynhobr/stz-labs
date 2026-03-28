"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { cn } from '../lib/utils';

const FAST_DOUBLE_THRESHOLD = 0.08;
const HIGHLIGHT_TIME = 50;

const formatSeconds = (seconds, t) => {
    if (typeof seconds !== "number" || Number.isNaN(seconds)) return "—";
    return `${seconds.toFixed(4)}${t("mouse_tester_tool.sec")}`;
};

const formatClock = (date) => {
    return date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
};

export default function MouseTester() {
    const { t } = useLanguage();

    const [stats, setStats] = useState({
        totalClicks: 0,
        fastDoubleClicks: 0,
        leftCount: 0,
        middleCount: 0,
        rightCount: 0,
        lastDiff: 0
    });

    const [status, setStatus] = useState({
        title: "",
        text: "",
        isFast: false
    });

    const [summary, setSummary] = useState({
        title: "",
        text: ""
    });

    const [logs, setLogs] = useState([]);
    const [activeButtons, setActiveButtons] = useState({ left: false, middle: false, right: false });

    const prevClickTimeRef = useRef(0);
    const logIndexRef = useRef(0);

    useEffect(() => {
        prevClickTimeRef.current = performance.now() / 1000;
    }, []);

    const handleMouseEvent = useCallback((event) => {
        event.preventDefault();
        
        const buttonMap = {
            0: { name: t("mouse_tester_tool.btn_left"), className: "left", activeKey: "left" },
            1: { name: t("mouse_tester_tool.btn_middle"), className: "middle", activeKey: "middle" },
            2: { name: t("mouse_tester_tool.btn_right"), className: "right", activeKey: "right" }
        };

        const btnInfo = buttonMap[event.button];
        if (!btnInfo) return;

        const currentTime = performance.now() / 1000;
        const diff = currentTime - prevClickTimeRef.current;
        prevClickTimeRef.current = currentTime;
        
        logIndexRef.current += 1;
        const currentLogId = logIndexRef.current;
        const timeNow = new Date();
        const isFastDouble = currentLogId > 1 && diff <= FAST_DOUBLE_THRESHOLD;
        
        setActiveButtons(curr => ({ ...curr, [btnInfo.activeKey]: true }));
        setTimeout(() => {
            setActiveButtons(curr => ({ ...curr, [btnInfo.activeKey]: false }));
        }, HIGHLIGHT_TIME);

        setStats(prev => {
            const newTotal = prev.totalClicks + 1;
            return {
                totalClicks: newTotal,
                fastDoubleClicks: prev.fastDoubleClicks + (isFastDouble ? 1 : 0),
                leftCount: prev.leftCount + (event.button === 0 ? 1 : 0),
                middleCount: prev.middleCount + (event.button === 1 ? 1 : 0),
                rightCount: prev.rightCount + (event.button === 2 ? 1 : 0),
                lastDiff: newTotal > 1 ? diff : prev.lastDiff
            };
        });

        if (isFastDouble) {
            setStatus({
                title: t("mouse_tester_tool.alert_fast_title"),
                text: t("mouse_tester_tool.alert_fast_desc").replace("{btn}", btnInfo.name).replace("{diff}", formatSeconds(diff, t)),
                isFast: true
            });
            setSummary({
                title: t("mouse_tester_tool.summary_critical"),
                text: t("mouse_tester_tool.alert_fast_summary").replace("{diff}", formatSeconds(diff, t))
            });
            setTimeout(() => setStatus(s => ({ ...s, isFast: false })), 220);
        } else {
            setStatus({
                title: t("mouse_tester_tool.alert_click_title").replace("{btn}", btnInfo.name),
                text: currentLogId > 1 ? t("mouse_tester_tool.alert_click_diff").replace("{diff}", formatSeconds(diff, t)) : t("mouse_tester_tool.alert_click_first"),
                isFast: false
            });
            setSummary({
                title: t("mouse_tester_tool.summary_click_title").replace("{btn}", btnInfo.name),
                text: currentLogId > 1 ? t("mouse_tester_tool.summary_click_diff").replace("{btn}", btnInfo.name).replace("{diff}", formatSeconds(diff, t)) : t("mouse_tester_tool.summary_click_first")
            });
        }

        setLogs(prevLogs => [
            {
                id: currentLogId,
                key: `${currentLogId}-${timeNow.getTime()}`,
                name: btnInfo.name,
                className: btnInfo.className,
                diff: currentLogId > 1 ? diff : null,
                time: timeNow,
                isFast: isFastDouble
            },
            ...prevLogs
        ]);

    }, [t]);

    const handleContextMenu = (e) => e.preventDefault();

    const resetAll = () => {
        setStats({ totalClicks: 0, fastDoubleClicks: 0, leftCount: 0, middleCount: 0, rightCount: 0, lastDiff: 0 });
        setLogs([]);
        logIndexRef.current = 0;
        prevClickTimeRef.current = performance.now() / 1000;
        setStatus({
            title: t("mouse_tester_tool.status_ready"),
            text: t("mouse_tester_tool.status_ready_desc"),
            isFast: false
        });
        setSummary({ 
            title: t("mouse_tester_tool.no_clicks"), 
            text: t("mouse_tester_tool.start_clicking") 
        });
    };

    const clearLogOnly = () => {
        setLogs([]);
        logIndexRef.current = 0;
    };    return (
        <main className="min-h-screen bg-transparent pt-24 pb-24 relative overflow-hidden">
            <div className="container max-w-6xl mx-auto px-6">
                <header className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                         <div className="max-w-3xl">
                             <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[var(--text-heading)] mb-4 uppercase">
                                 {t("mouse_tester_tool.page_title")}
                             </h1>
                             <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl opacity-80">
                                 {t("mouse_tester_tool.page_desc")}
                             </p>
                         </div>
                         <Badge variant="outline" className="h-fit px-4 py-1.5 text-xs font-bold uppercase tracking-widest border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/[0.05] rounded-full shrink-0">
                             {t("mouse_tester_tool.badge")}
                         </Badge>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Test Area Panel */}
                    <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                        <section className="p-8 md:p-10 rounded-[var(--radius-card)] bg-[var(--surface-primary)] backdrop-blur-[var(--backdrop-blur)] border [border-color:var(--border-subtle)] shadow-[var(--shadow)] relative overflow-hidden group min-h-[580px] flex flex-col justify-between">
                           <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/[0.02] via-transparent to-transparent pointer-events-none" />
                           
                           <div className="flex items-center justify-between mb-8 relative z-10 shrink-0">
                               <div>
                                    <h2 className="text-xl font-bold text-[var(--text-heading)] mb-1 tracking-tight">
                                        {t("mouse_tester_tool.area_title")}
                                    </h2>
                                    <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--text-muted)]">
                                        {t("mouse_tester_tool.area_subtitle")}
                                    </span>
                               </div>
                           </div>

                           <div 
                                className={cn(
                                    "relative w-full aspect-video rounded-2xl bg-[var(--surface-3)] border [border-color:var(--border-strong)] flex items-center justify-center cursor-crosshair outline-none transition-all duration-300 group/area select-none shrink-0",
                                    status.isFast && "shadow-[inset_0_0_80px_rgba(var(--accent-rgb),0.3)] [border-color:var(--accent)]"
                                )}
                                tabIndex="0"
                                onMouseDown={handleMouseEvent}
                                onContextMenu={handleContextMenu}
                            >
                                 <div className="absolute inset-4 rounded-xl border border-dashed [border-color:var(--border-muted)] opacity-20 pointer-events-none group-hover/area:opacity-60 transition-opacity duration-700" />
                                
                                <div className="relative z-10 w-full max-w-[170px] md:max-w-[210px] pointer-events-none flex flex-col items-center">
                                    <svg className="w-full h-auto drop-shadow-2xl opacity-90 transition-transform duration-500 group-hover/area:scale-[1.02]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
                                        <path className="fill-[var(--surface-4)] stroke-[var(--border-strong)] stroke-[20px] transition-colors duration-300" d="M407.352 0C270.94 0 132.854 68.485 132.854 199.394v333.458c0 147.309 119.834 267.146 267.146 267.146 147.31 0 267.144-119.837 267.144-267.146V199.394C667.144 62.392 532.484 0 407.352 0zm209.51 532.852c0 119.59-97.286 216.858-216.862 216.858-119.58 0-216.858-97.269-216.858-216.858V376.893c44.903 13.585 129.421 34.136 229.341 34.136 63.976 0 134.236-8.545 204.38-32.682v154.505zm0-207.994c-183.262 70.074-377.714 17.311-433.72-.817V199.394c0-96.85 115.52-149.109 224.21-149.109 104.284 0 209.51 46.1 209.51 149.11v125.463z" />
                                        <path className={cn("fill-[var(--text-muted)] opacity-30 transition-all duration-75", activeButtons.middle && "fill-[var(--accent)] opacity-100 scale-105 origin-center")} d="M428.285 108.565v182.287c0 13.88-11.27 25.146-25.142 25.146-13.876 0-25.144-11.265-25.144-25.146V108.565c0-13.879 11.266-25.144 25.144-25.144 13.87 0 25.142 11.265 25.142 25.144z" />
                                        <path className={cn("fill-[var(--text-muted)] opacity-20 transition-all duration-75", activeButtons.right && "fill-[var(--accent)] opacity-80")} d="M592.917 292.514s-104.746 29.328-140.372 23.044V82.986s167.61 2.097 140.372 209.528z" />
                                        <path className={cn("fill-[var(--text-muted)] opacity-20 transition-all duration-75", activeButtons.left && "fill-[var(--accent)] opacity-80")} d="M353.91 80.986v232.572c-35.626 6.284-140.372-23.044-140.372-23.044C186.301 83.084 353.91 80.986 353.91 80.986z" />
                                    </svg>

                                    <div className="mt-4 text-center w-full px-4 overflow-hidden">
                                        <h3 className="text-lg md:text-xl font-bold text-[var(--text-heading)] tracking-tighter uppercase truncate">
                                            {status.title || t("mouse_tester_tool.status_ready")}
                                        </h3>
                                        <p className="text-[10px] md:text-xs text-[var(--text-muted)] font-medium mt-1 line-clamp-1">
                                            {status.text || t("mouse_tester_tool.status_ready_desc")}
                                        </p>
                                    </div>
                                </div>
                           </div>

                           {/* Stats Bento Grid */}
                           <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8 relative z-10 shrink-0">
                                <div className="p-4 rounded-xl bg-[var(--surface-3)] border [border-color:var(--border-subtle)] text-center">
                                    <div className="text-[10px] uppercase font-mono tracking-widest text-[var(--text-muted)] mb-1 opacity-60">Total</div>
                                    <div className="text-2xl font-bold text-[var(--text-heading)] tracking-tight">{stats.totalClicks}</div>
                                </div>
                                <div className={cn("p-4 rounded-xl bg-[var(--surface-3)] border [border-color:var(--border-subtle)] text-center transition-colors", stats.fastDoubleClicks > 0 && "border-[var(--accent)]/40 bg-[var(--accent)]/[0.04]")}>
                                    <div className="text-[10px] uppercase font-mono tracking-widest text-[var(--text-muted)] mb-1 opacity-60">Fasts</div>
                                    <div className={cn("text-2xl font-bold tracking-tight", stats.fastDoubleClicks > 0 ? "text-[var(--accent)]" : "text-[var(--text-heading)]")}>{stats.fastDoubleClicks}</div>
                                </div>
                                <div className="p-4 rounded-xl bg-[var(--surface-3)] border [border-color:var(--border-subtle)] text-center">
                                    <div className="text-[10px] uppercase font-mono tracking-widest text-[var(--text-muted)] mb-1 opacity-60">Interval</div>
                                    <div className="text-2xl font-bold text-[var(--text-heading)] tracking-tight">{stats.totalClicks > 1 ? formatSeconds(stats.lastDiff, t).replace(t("mouse_tester_tool.sec"), "") : "—"}</div>
                                </div>
                           </div>

                           <div className="flex items-center justify-center gap-4 mt-8 pt-8 border-t [border-color:var(--border-muted)]/10 relative z-10 shrink-0">
                                <Button onClick={resetAll} size="lg" className="px-10 font-bold tracking-tighter uppercase shadow-xl cursor-pointer">
                                    {t("mouse_tester_tool.reset")}
                                </Button>
                                <Button onClick={clearLogOnly} variant="secondary" size="lg" className="px-10 font-bold tracking-tighter uppercase cursor-pointer">
                                    {t("mouse_tester_tool.clear_log")}
                                </Button>
                           </div>
                        </section>
                    </div>

                    {/* Log Panel */}
                    <div className="lg:col-span-12 xl:col-span-5 h-full">
                        <section className="p-8 rounded-[var(--radius-card)] bg-[var(--surface-primary)] backdrop-blur-[var(--backdrop-blur)] border [border-color:var(--border-subtle)] shadow-[var(--shadow)] flex flex-col h-full lg:max-h-[760px] xl:max-h-[680px] relative overflow-hidden">
                           <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface-3)]/50 via-transparent to-transparent pointer-events-none" />
                           
                           <div className="flex items-center justify-between mb-8 relative z-10 shrink-0">
                               <div>
                                    <h2 className="text-xl font-bold text-[var(--text-heading)] mb-1 tracking-tight">
                                        {t("mouse_tester_tool.log_title")}
                                    </h2>
                                    <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--text-muted)]">
                                        {t("mouse_tester_tool.log_subtitle")}
                                    </span>
                               </div>
                           </div>

                           <div className="p-5 rounded-xl bg-[var(--surface-3)] border [border-color:var(--border-subtle)] mb-6 relative z-10 shrink-0 border-l-4 [border-left-color:var(--accent)]">
                                <div className="text-[10px] uppercase font-mono tracking-[0.2em] text-[var(--accent)] font-bold mb-1 opacity-80">{summary.title ? t("mouse_tester_tool.summary_label") : t("mouse_tester_tool.no_clicks")}</div>
                                <div className="text-sm text-[var(--text-primary)] font-medium leading-relaxed">
                                    {summary.text || t("mouse_tester_tool.start_clicking")}
                                </div>
                           </div>

                           <div className="flex-1 overflow-hidden relative z-10 rounded-xl bg-[var(--surface-3)]/30 border [border-color:var(--border-strong)]">
                                <div className="h-full overflow-y-auto custom-scrollbar max-h-[400px]">
                                    <table className="w-full text-left text-[11px] border-collapse">
                                        <thead className="sticky top-0 bg-[var(--surface-4)] z-20 shadow-sm">
                                            <tr className="border-b [border-color:var(--border-strong)]">
                                                <th className="p-4 font-bold uppercase tracking-widest text-[var(--text-muted)]">ID</th>
                                                <th className="p-4 font-bold uppercase tracking-widest text-[var(--text-muted)]">BTN</th>
                                                <th className="p-4 font-bold uppercase tracking-widest text-[var(--text-muted)]">INTERVAL</th>
                                                <th className="p-4 font-bold uppercase tracking-widest text-[var(--text-muted)] text-right">TIME</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {logs.length === 0 ? (
                                                <tr>
                                                    <td colSpan="4" className="p-20 text-center text-[var(--text-muted)] font-mono italic opacity-40">
                                                        {t("mouse_tester_tool.no_records")}
                                                    </td>
                                                </tr>
                                            ) : (
                                                logs.map(log => (
                                                    <tr key={log.key} className={cn(
                                                        "border-b [border-color:var(--border-subtle)] transition-colors hover:bg-[var(--accent)]/[0.04]",
                                                        log.isFast && "bg-[var(--accent)]/[0.06] animate-pulse-subtle"
                                                    )}>
                                                        <td className="p-4 font-mono text-[var(--text-muted)]">{log.id}</td>
                                                        <td className="p-4">
                                                            <div className={cn(
                                                                "inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-tighter",
                                                                log.isFast ? "bg-[var(--accent)] text-white shadow-lg" : "bg-[var(--surface-4)] text-[var(--text-primary)] border [border-color:var(--border-subtle)]"
                                                            )}>
                                                                {log.name}
                                                            </div>
                                                        </td>
                                                        <td className={cn(
                                                            "p-4 font-mono font-bold",
                                                            log.isFast ? "text-[var(--accent)]" : "text-[var(--text-primary)]"
                                                        )}>
                                                            {log.diff !== null ? formatSeconds(log.diff, t) : "—"}
                                                        </td>
                                                        <td className="p-4 text-right font-mono text-[var(--text-muted)] opacity-60">
                                                            {formatClock(log.time)}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                           </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
