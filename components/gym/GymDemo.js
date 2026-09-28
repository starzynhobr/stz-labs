"use client";

import { useEffect, useRef, useState } from 'react';
import GymPhone from './GymPhone';
import { GYM_DEMO_START, GYM_LIMITS, GYM_THEMES, getGymAppCopy } from '../../data/stzGym';

const TOAST_MS = 2200;

/** Aplica uma ação da tela inicial; devolve o novo estado e a mensagem do toast. */
function applyAction(state, action, copy) {
    switch (action) {
        case 'water':
            return [{ ...state, water: state.water >= GYM_LIMITS.water ? 0 : state.water + GYM_LIMITS.waterStep }, null];
        case 'meal':
            return [{ ...state, meals: (state.meals + 1) % (GYM_LIMITS.meals + 1) }, null];
        case 'mission': {
            if (state.missions >= GYM_LIMITS.missions) return [state, copy.allDone];
            const missions = state.missions + 1;
            const done = missions === GYM_LIMITS.missions;
            return [{
                ...state,
                missions,
                coins: state.coins + GYM_LIMITS.missionReward,
                xp: Math.min(state.xp + 9, 100),
                streak: done ? state.streak + 1 : state.streak,
            }, done ? copy.allDone : copy.missionDone];
        }
        default:
            return [state, copy.onlyInApp];
    }
}

export default function GymDemo({ locale, text }) {
    const copy = getGymAppCopy(locale);
    const [state, setState] = useState(GYM_DEMO_START);
    const [tab, setTab] = useState('home');
    const [theme, setTheme] = useState(GYM_THEMES[0]);
    const [toast, setToast] = useState(null);
    const toastTimer = useRef(null);

    useEffect(() => () => clearTimeout(toastTimer.current), []);

    const showToast = (message) => {
        if (!message) return;
        setToast(message);
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(null), TOAST_MS);
    };

    const handleAction = (action) => {
        const [next, message] = applyAction(state, action, copy);
        setState(next);
        showToast(message);
    };

    const reset = () => {
        setState(GYM_DEMO_START);
        setTab('home');
        setTheme(GYM_THEMES[0]);
        setToast(null);
    };

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="relative w-full">
                <div
                    className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[100px] transition-colors duration-700"
                    style={{ backgroundColor: theme.primary }}
                    aria-hidden="true"
                />
                <GymPhone
                    interactive
                    state={state}
                    theme={theme}
                    copy={copy}
                    label={text.phoneLabel}
                    tab={tab}
                    onTab={setTab}
                    onAction={handleAction}
                    onToast={showToast}
                    toast={toast}
                />
            </div>

            <div className="flex w-full max-w-[340px] flex-col items-center gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{text.themes}</p>
                <div className="flex flex-wrap justify-center gap-2">
                    {GYM_THEMES.map((item) => {
                        const active = item.id === theme.id;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                title={item.name}
                                aria-label={item.name}
                                aria-pressed={active}
                                onClick={() => setTheme(item)}
                                className={`size-8 rounded-full border-2 transition-transform hover:scale-110 ${active ? 'scale-110 border-[var(--text-primary)]' : 'border-transparent'}`}
                                style={{ background: `linear-gradient(135deg, ${item.primary} 50%, ${item.secondary} 50%)` }}
                            />
                        );
                    })}
                </div>
                <button
                    type="button"
                    onClick={reset}
                    className="text-xs text-[var(--text-secondary)] underline-offset-4 transition-colors hover:text-[var(--accent)] hover:underline"
                >
                    {text.reset}
                </button>
            </div>
        </div>
    );
}
