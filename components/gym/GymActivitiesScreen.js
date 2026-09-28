"use client";

import { useState } from 'react';
import GymIcon from './GymIcons';
import { GYM_PLANS, GYM_RUN_SAMPLE } from '../../data/stzGym';

const CARD = 'rounded-2xl border border-white/10 bg-white/[0.04]';

function Segmented({ value, onChange, copy }) {
    const items = [
        { id: 'training', icon: 'fitness', label: copy.training },
        { id: 'running', icon: 'run', label: copy.running },
    ];

    return (
        <div className="grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-black/40 p-1">
            {items.map((item) => {
                const active = item.id === value;
                return (
                    <button
                        key={item.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => onChange(item.id)}
                        className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-[11px] transition-colors ${active ? 'border border-[var(--g-primary)] bg-[var(--g-primary)]/15 font-semibold text-[var(--g-primary)]' : 'border border-transparent text-white/70'}`}
                    >
                        <GymIcon name={item.icon} className="size-3.5" />
                        {item.label}
                    </button>
                );
            })}
        </div>
    );
}

function Chip({ icon, children }) {
    return (
        <span className="flex items-center gap-1 rounded-md bg-white/15 px-2 py-1 text-[9px] text-white/70">
            <GymIcon name={icon} className="size-3" />
            {children}
        </span>
    );
}

function DayCard({ entry, isToday, copy, onToast }) {
    return (
        <article className={`rounded-2xl p-3 ${isToday ? 'border border-[var(--g-primary)] bg-white/[0.03] shadow-[0_0_20px_-10px_var(--g-primary)]' : CARD}`}>
            <div className="flex items-start justify-between gap-2">
                <div>
                    <p className={`text-sm font-bold ${isToday ? 'text-[var(--g-primary)]' : ''}`}>{copy.weekdays[entry.day]}</p>
                    <p className="text-[11px] text-[var(--g-primary)]">{entry.workout}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[9px] ${isToday ? 'bg-[var(--g-primary)]/15 text-[var(--g-primary)]' : 'bg-white/10 text-white/70'}`}>
                    {isToday ? copy.today : copy.planned}
                </span>
            </div>
            <div className="mt-2 flex gap-1.5">
                <Chip icon="fitness">{entry.exercises} {copy.exercisesN}</Chip>
                <Chip icon="clock">~{entry.minutes} {copy.minutesN}</Chip>
            </div>
            {isToday && (
                <button
                    type="button"
                    onClick={() => onToast(copy.onlyInApp)}
                    className="mt-3 w-full rounded-xl bg-[var(--g-primary)] py-2.5 text-xs font-bold text-black shadow-[0_0_18px_-4px_var(--g-primary)] transition-transform active:scale-95"
                >
                    {copy.startWorkout}
                </button>
            )}
            <button
                type="button"
                onClick={() => onToast(copy.onlyInApp)}
                className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/15 py-2 text-[11px] font-semibold transition-colors hover:border-white/30"
            >
                <GymIcon name="tune" className="size-3.5" />
                {copy.customize}
            </button>
        </article>
    );
}

function TrainingTab({ copy, onToast }) {
    const [planId, setPlanId] = useState(GYM_PLANS[0].id);
    const [menuOpen, setMenuOpen] = useState(false);
    const [weekOpen, setWeekOpen] = useState(false);
    const plan = GYM_PLANS.find((item) => item.id === planId);
    const [today, ...rest] = plan.week;

    const pickPlan = (item) => {
        setPlanId(item.id);
        setMenuOpen(false);
        onToast(`${copy.planChanged} ${item.name}`);
    };

    return (
        <>
            <div className="flex items-center gap-2">
                <div className="relative flex-1">
                    <button
                        type="button"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((open) => !open)}
                        className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-xs font-semibold"
                    >
                        {plan.name}
                        <GymIcon name="expand" className={`size-4 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {menuOpen && (
                        <ul className="absolute inset-x-0 top-full z-20 mt-1 overflow-hidden rounded-xl border border-white/10 bg-[#0d1322] shadow-xl">
                            {GYM_PLANS.map((item) => (
                                <li key={item.id}>
                                    <button
                                        type="button"
                                        onClick={() => pickPlan(item)}
                                        className={`w-full px-3 py-2 text-left text-[11px] transition-colors hover:bg-white/5 ${item.id === planId ? 'text-[var(--g-primary)]' : ''}`}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {[['share', copy.share], ['download', copy.importPlan], ['list', copy.listPlans]].map(([icon, label]) => (
                    <button key={icon} type="button" aria-label={label} title={label} onClick={() => onToast(copy.onlyInApp)} className="p-1 text-white/90 transition-colors hover:text-[var(--g-primary)]">
                        <GymIcon name={icon} className="size-4" />
                    </button>
                ))}
            </div>
            <p className="-mt-1 text-[9px] text-white/50">{copy.mainPlan}: {plan.name} • {copy.activePreset}: {plan.name}</p>

            <DayCard entry={today} isToday copy={copy} onToast={onToast} />

            <button
                type="button"
                aria-expanded={weekOpen}
                onClick={() => setWeekOpen((open) => !open)}
                className="flex items-center justify-center gap-1 py-1 text-[11px] text-white/80"
            >
                <GymIcon name="expand" className={`size-4 transition-transform ${weekOpen ? 'rotate-180' : ''}`} />
                {weekOpen ? copy.hideWeek : copy.showWeek}
            </button>

            {weekOpen && rest.map((entry) => (
                <DayCard key={`${plan.id}-${entry.day}`} entry={entry} copy={copy} onToast={onToast} />
            ))}
        </>
    );
}

function Metric({ icon, label, value }) {
    return (
        <div className="flex items-start gap-2 rounded-xl bg-black/60 p-2.5">
            <GymIcon name={icon} className="mt-0.5 size-4 shrink-0 text-[var(--g-primary)]" />
            <div className="min-w-0">
                <p className="text-[9px] text-white/60">{label}</p>
                <p className="text-xs font-bold tabular-nums">{value}</p>
            </div>
        </div>
    );
}

function RunningTab({ copy, onToast }) {
    const run = GYM_RUN_SAMPLE;

    return (
        <>
            <section className={`${CARD} p-3`}>
                <p className="mb-2.5 text-center text-sm font-semibold">{copy.weekSummary}</p>
                <div className="grid grid-cols-2 gap-2">
                    <Metric icon="ruler" label={copy.totalDistance} value={run.distance} />
                    <Metric icon="clock" label={copy.totalTime} value={run.time} />
                    <Metric icon="speed" label={copy.avgPace} value={run.pace} />
                    <Metric icon="calendar" label={copy.runDays} value={run.days} />
                </div>
            </section>

            <section className={`${CARD} p-3`}>
                <p className="mb-2.5 text-center text-sm font-semibold">{copy.records}</p>
                <div className="grid grid-cols-2 gap-2">
                    {run.records.map((record) => (
                        <div key={record.label} className="flex items-center gap-2 rounded-xl bg-black/60 p-2.5">
                            <GymIcon name="trophy" className="size-4 text-amber-400" />
                            <span className="text-[10px] text-white/60">{record.label}</span>
                            <span className="ml-auto text-xs font-bold tabular-nums">{record.value}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className={`${CARD} p-3`}>
                <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold">{copy.recentSessions}</p>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[8px] uppercase tracking-wider text-white/50">{copy.sampleData}</span>
                </div>
                <ul className="flex flex-col divide-y divide-white/5">
                    {run.sessions.map((session) => (
                        <li key={session.day} className="flex items-center gap-2 py-2 text-[10px]">
                            <GymIcon name="run" className="size-4 text-[var(--g-primary)]" />
                            <span className="flex-1 text-white/80">{copy.weekdays[session.day]}</span>
                            <span className="font-semibold tabular-nums">{session.km}</span>
                            <span className="w-10 text-right tabular-nums text-white/60">{session.time}</span>
                            <span className="w-9 text-right tabular-nums text-white/60">{session.pace}</span>
                        </li>
                    ))}
                </ul>
                <button
                    type="button"
                    onClick={() => onToast(copy.onlyInApp)}
                    className="mt-2 rounded-xl bg-[var(--g-primary)] px-4 py-2 text-[11px] font-bold text-black shadow-[0_0_14px_-4px_var(--g-primary)]"
                >
                    {copy.connect}
                </button>
            </section>
        </>
    );
}

export default function GymActivitiesScreen({ copy, onToast }) {
    const [section, setSection] = useState('training');

    return (
        <div className="flex flex-col gap-3 px-3.5 pb-4 pt-10">
            <h3 className="text-center text-sm font-semibold">{copy.activitiesTitle}</h3>
            <Segmented value={section} onChange={setSection} copy={copy} />
            {section === 'training' ? (
                <TrainingTab copy={copy} onToast={onToast} />
            ) : (
                <RunningTab copy={copy} onToast={onToast} />
            )}
        </div>
    );
}
