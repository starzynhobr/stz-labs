"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './MouseTester.module.css';
import { useLanguage } from '../context/LanguageContext';

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
    };

    return (
        <main className="products" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
            <div className="container" style={{ maxWidth: '1180px' }}>
                <div className="section-header section-header-projects">
                    <div className="section-header-top">
                        <div>
                            <h2>{t("mouse_tester_tool.page_title")}</h2>
                            <p className="text-muted" style={{ maxWidth: '760px' }}>
                                {t("mouse_tester_tool.page_desc")}
                            </p>
                        </div>
                        <div className="badge stable" style={{ alignSelf: 'flex-start', padding: '10px 14px', fontSize: '0.9rem', borderRadius: '999px', whiteSpace: 'nowrap' }}>
                            {t("mouse_tester_tool.badge")}
                        </div>
                    </div>
                </div>

                <section className={styles.grid}>
                    <div className={styles.panel}>
                        <div className={styles.panelHead}>
                            <h2>{t("mouse_tester_tool.area_title")}</h2>
                            <span>{t("mouse_tester_tool.area_subtitle")}</span>
                        </div>

                        <div 
                            className={`${styles.testArea} ${status.isFast ? styles.testAreaFast : ''}`}
                            tabIndex="0"
                            onMouseDown={handleMouseEvent}
                            onContextMenu={handleContextMenu}
                        >
                            <div className={styles.mouseWrap}>
                                <svg className={styles.mouseSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" aria-hidden="true">
                                    <path className={styles.mouseBase} d="M407.352 0C270.94 0 132.854 68.485 132.854 199.394v333.458c0 147.309 119.834 267.146 267.146 267.146 147.31 0 267.144-119.837 267.144-267.146V199.394C667.144 62.392 532.484 0 407.352 0zm209.51 532.852c0 119.59-97.286 216.858-216.862 216.858-119.58 0-216.858-97.269-216.858-216.858V376.893c44.903 13.585 129.421 34.136 229.341 34.136 63.976 0 134.236-8.545 204.38-32.682v154.505zm0-207.994c-183.262 70.074-377.714 17.311-433.72-.817V199.394c0-96.85 115.52-149.109 224.21-149.109 104.284 0 209.51 46.1 209.51 149.11v125.463z" />
                                    <path className={`${styles.mouseBtn} ${activeButtons.middle ? styles.activeMiddle : ''}`} d="M428.285 108.565v182.287c0 13.88-11.27 25.146-25.142 25.146-13.876 0-25.144-11.265-25.144-25.146V108.565c0-13.879 11.266-25.144 25.144-25.144 13.87 0 25.142 11.265 25.142 25.144z" />
                                    <path className={`${styles.mouseBtn} ${activeButtons.right ? styles.activeRight : ''}`} d="M592.917 292.514s-104.746 29.328-140.372 23.044V82.986s167.61 2.097 140.372 209.528z" />
                                    <path className={`${styles.mouseBtn} ${activeButtons.left ? styles.activeLeft : ''}`} d="M353.91 80.986v232.572c-35.626 6.284-140.372-23.044-140.372-23.044C186.301 83.084 353.91 80.986 353.91 80.986z" />
                                </svg>

                                <div className={styles.mouseText}>
                                    <h3>{status.title || t("mouse_tester_tool.status_ready")}</h3>
                                    <p>{status.text || t("mouse_tester_tool.status_ready_desc")}</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.stats}>
                            <div className={styles.stat}>
                                <div className={styles.label}>{t("mouse_tester_tool.total_clicks")}</div>
                                <div className={styles.value}>{stats.totalClicks}</div>
                            </div>
                            <div className={`${styles.stat} ${styles.danger}`}>
                                <div className={styles.label}>{t("mouse_tester_tool.fast_double")}</div>
                                <div className={styles.value}>{stats.fastDoubleClicks}</div>
                            </div>
                            <div className={`${styles.stat} ${styles.left}`}>
                                <div className={styles.label}>{t("mouse_tester_tool.btn_left")}</div>
                                <div className={styles.value}>{stats.leftCount}</div>
                            </div>
                            <div className={`${styles.stat} ${styles.middle}`}>
                                <div className={styles.label}>{t("mouse_tester_tool.btn_middle")}</div>
                                <div className={styles.value}>{stats.middleCount}</div>
                            </div>
                            <div className={`${styles.stat} ${styles.right}`}>
                                <div className={styles.label}>{t("mouse_tester_tool.btn_right")}</div>
                                <div className={styles.value}>{stats.rightCount}</div>
                            </div>
                            <div className={`${styles.stat} ${styles.success}`}>
                                <div className={styles.label}>{t("mouse_tester_tool.last_interval")}</div>
                                <div className={styles.value}>{stats.totalClicks > 1 ? formatSeconds(stats.lastDiff, t) : "—"}</div>
                            </div>
                        </div>

                        <div className={styles.legend}>
                            <div className={styles.legendItem}><span className={`${styles.dot} ${styles.left}`}></span> {t("mouse_tester_tool.btn_left")}</div>
                            <div className={styles.legendItem}><span className={`${styles.dot} ${styles.middle}`}></span> {t("mouse_tester_tool.btn_middle")}</div>
                            <div className={styles.legendItem}><span className={`${styles.dot} ${styles.right}`}></span> {t("mouse_tester_tool.btn_right")}</div>
                            <div className={styles.legendItem}><span className={`${styles.dot} ${styles.fast}`}></span> {t("mouse_tester_tool.status_fast")}</div>
                        </div>

                        <div className={styles.controls}>
                            <button onClick={resetAll} className="btn btn-primary">{t("mouse_tester_tool.reset")}</button>
                            <button onClick={clearLogOnly} className="btn btn-secondary">{t("mouse_tester_tool.clear_log")}</button>
                        </div>
                    </div>

                    <div className={styles.panel}>
                        <div className={styles.panelHead}>
                            <h2>{t("mouse_tester_tool.log_title")}</h2>
                            <span>{t("mouse_tester_tool.log_subtitle")}</span>
                        </div>

                        <div className={styles.logBox}>
                            <div className={styles.logSummary}>
                                <strong>{summary.title || t("mouse_tester_tool.no_clicks")}</strong>
                                <span>{summary.text || t("mouse_tester_tool.start_clicking")}</span>
                            </div>

                            <div className={styles.tableWrap}>
                                <table className={styles.logTable}>
                                    <thead>
                                        <tr>
                                            <th>{t("mouse_tester_tool.table_id")}</th>
                                            <th>{t("mouse_tester_tool.table_btn")}</th>
                                            <th>{t("mouse_tester_tool.table_interval")}</th>
                                            <th>{t("mouse_tester_tool.table_time")}</th>
                                            <th>{t("mouse_tester_tool.table_status")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {logs.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className={styles.empty}>{t("mouse_tester_tool.no_records")}</td>
                                            </tr>
                                        ) : (
                                            logs.map(log => (
                                                <tr key={log.key}>
                                                    <td>{log.id}</td>
                                                    <td><span className={`${styles.pill} ${styles[log.className]}`}>{log.name}</span></td>
                                                    <td>{log.diff !== null ? formatSeconds(log.diff, t) : "—"}</td>
                                                    <td>{formatClock(log.time)}</td>
                                                    <td>
                                                        <span className={`${styles.pill} ${log.isFast ? styles.fast : styles.normal}`}>
                                                            {log.isFast ? t("mouse_tester_tool.status_fast") : t("mouse_tester_tool.status_normal")}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
