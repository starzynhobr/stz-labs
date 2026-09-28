"use client";

import { useState } from 'react';
import GymAvatar from './GymAvatar';
import GymIcon from './GymIcons';
import { GYM_BORDERS, GYM_POWERUPS, GYM_THEMES, gymItemText } from '../../data/stzGym';

const CARD = 'rounded-2xl border border-white/10 bg-white/[0.04]';

function Price({ icon = 'coin', value, affordable = true }) {
    return (
        <span className={`inline-flex items-center gap-1 rounded-lg border border-white/15 px-2 py-0.5 text-[9px] font-semibold tabular-nums ${affordable ? 'text-white/80' : 'text-white/40'}`}>
            <GymIcon name={icon} className={`size-3 ${icon === 'gem' ? 'text-sky-300' : 'text-[var(--g-primary)]'}`} />
            {value}
        </span>
    );
}

function unlockLabel(theme, copy) {
    const { unlock } = theme;
    if (unlock.type === 'rank') return `${copy.unlocks.rank} ${unlock.key}`;
    return copy.unlocks[unlock.key];
}

function ThemeCard({ theme, active, copy, onPick }) {
    const { unlock } = theme;

    return (
        <button
            type="button"
            onClick={() => onPick(theme)}
            aria-pressed={active}
            className={`flex flex-col gap-2 rounded-2xl p-2 text-left transition-colors ${active ? 'border border-[var(--g-primary)] bg-[var(--g-primary)]/10' : `${CARD} hover:border-white/25`}`}
        >
            <span className="block rounded-xl border border-white/10 p-1.5" style={{ background: theme.id === 'frost_white' ? '#f4f7fb' : '#0b0f19' }}>
                <span className="flex gap-1">
                    <span className="h-1 flex-1 rounded-full" style={{ background: theme.primary }} />
                    <span className="h-1 w-3 rounded-full" style={{ background: theme.secondary }} />
                </span>
                <span className="mt-1.5 flex gap-1">
                    <span className="h-5 flex-1 rounded-lg border border-white/10 bg-black/60" />
                    <span className="h-5 flex-1 rounded-lg" style={{ background: `${theme.primary}88` }} />
                </span>
            </span>
            <span className="text-[11px] font-semibold">{theme.name}</span>
            {active ? (
                <span className="self-start rounded-lg border border-[var(--g-primary)] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[var(--g-primary)]">{copy.equipped}</span>
            ) : unlock.type === 'free' ? (
                <span className="self-start text-[9px] text-white/60">{copy.equip}</span>
            ) : unlock.type === 'coins' || unlock.type === 'gems' ? (
                <Price icon={unlock.type === 'gems' ? 'gem' : 'coin'} value={unlock.price} />
            ) : (
                <span className="flex items-center gap-1 self-start rounded-lg border border-white/15 px-1.5 py-0.5 text-[8px] text-white/60">
                    <GymIcon name="lock" className="size-2.5" />
                    {unlockLabel(theme, copy)}
                </span>
            )}
        </button>
    );
}

function BordersTab({ state, copy, locale, onAction }) {
    return (
        <div className="grid grid-cols-2 gap-2">
            {GYM_BORDERS.map((border) => {
                const owned = state.ownedBorders.includes(border.id);
                const equipped = state.border === border.id;
                return (
                    <button
                        key={border.id}
                        type="button"
                        onClick={() => onAction('border', border.id)}
                        className={`flex flex-col items-center gap-1.5 rounded-2xl p-2.5 transition-colors ${equipped ? 'border border-[var(--g-primary)] bg-[var(--g-primary)]/10' : `${CARD} hover:border-white/25`}`}
                    >
                        <GymAvatar letter={copy.user[0]} borderId={border.id} className="size-12 text-base" />
                        <span className="text-center text-[10px] font-semibold leading-tight">{gymItemText(border.name, locale)}</span>
                        {equipped ? (
                            <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--g-primary)]">{copy.equipped}</span>
                        ) : owned ? (
                            <span className="text-[9px] text-white/60">{copy.equip}</span>
                        ) : (
                            <Price value={border.price} affordable={state.coins >= border.price} />
                        )}
                    </button>
                );
            })}
        </div>
    );
}

function PowerupsTab({ state, copy, locale, onAction }) {
    return (
        <div className="flex flex-col gap-2">
            {GYM_POWERUPS.map((item) => {
                const active = state.powerups.includes(item.id);
                return (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => onAction('powerup', item.id)}
                        disabled={active}
                        className={`flex items-center gap-3 rounded-2xl p-3 text-left transition-colors ${active ? 'border border-[var(--g-primary)] bg-[var(--g-primary)]/10' : `${CARD} hover:border-white/25`}`}
                    >
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--g-primary)]/15 text-[var(--g-primary)]">
                            <GymIcon name={item.icon} className="size-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                            <span className="block text-xs font-semibold">{gymItemText(item.name, locale)}</span>
                            <span className="block text-[9px] text-white/60">{gymItemText(item.text, locale)}</span>
                        </span>
                        {active ? (
                            <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--g-primary)]">{copy.active}</span>
                        ) : (
                            <Price value={item.price} affordable={state.coins >= item.price} />
                        )}
                    </button>
                );
            })}
        </div>
    );
}

export default function GymStoreScreen({ state, theme, copy, locale, onAction, onBack }) {
    const [section, setSection] = useState('themes');

    return (
        <div className="flex flex-col gap-3 px-3.5 pb-4 pt-10">
            <header className="flex items-center gap-2">
                <button type="button" onClick={onBack} aria-label={copy.back} className="-ml-1 p-1">
                    <GymIcon name="back" className="size-5" />
                </button>
                <h3 className="flex-1 text-center text-sm font-semibold">{copy.store}</h3>
                <span className="flex items-center gap-0.5 text-[11px] font-bold tabular-nums">
                    <GymIcon name="gem" className="size-3.5 text-sky-300" />{state.gems}
                </span>
                <span className="flex items-center gap-0.5 text-[11px] font-bold tabular-nums">
                    <GymIcon name="coin" className="size-3.5 text-[var(--g-primary)]" />{state.coins}
                </span>
            </header>

            <div className="grid grid-cols-3 gap-1 rounded-xl border border-white/10 bg-black/40 p-1">
                {Object.entries(copy.storeTabs).map(([id, label]) => (
                    <button
                        key={id}
                        type="button"
                        aria-pressed={id === section}
                        onClick={() => setSection(id)}
                        className={`rounded-lg py-1.5 text-[9px] leading-tight transition-colors ${id === section ? 'border border-[var(--g-primary)] bg-[var(--g-primary)]/15 font-semibold text-[var(--g-primary)]' : 'border border-transparent text-white/70'}`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <p className="text-sm font-semibold">{copy.storeTabs[section]}</p>

            {section === 'themes' && (
                <div className="grid grid-cols-2 gap-2">
                    {GYM_THEMES.map((item) => (
                        <ThemeCard key={item.id} theme={item} active={item.id === theme.id} copy={copy} onPick={(picked) => onAction('theme', picked.id)} />
                    ))}
                </div>
            )}
            {section === 'borders' && <BordersTab state={state} copy={copy} locale={locale} onAction={onAction} />}
            {section === 'powerups' && <PowerupsTab state={state} copy={copy} locale={locale} onAction={onAction} />}
        </div>
    );
}
