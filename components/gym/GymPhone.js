import GymIcon from './GymIcons';
import GymActivitiesScreen from './GymActivitiesScreen';
import { GYM_LIMITS } from '../../data/stzGym';

const CARD = 'rounded-2xl border border-white/10 bg-white/[0.04]';

/** Moldura de celular; a tela recebe as cores do tema via variáveis CSS. */
export function PhoneFrame({ theme, label, className = '', children }) {
    return (
        <div
            role="group"
            aria-label={label}
            className={`relative mx-auto w-full max-w-[300px] rounded-[44px] border border-white/15 bg-[#07090f] p-2.5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ${className}`}
            style={{ '--g-primary': theme.primary, '--g-secondary': theme.secondary }}
        >
            <div className="relative aspect-[9/19] overflow-hidden rounded-[36px] bg-gradient-to-b from-[#0f1c33] via-[#080d1a] to-[#04060b] text-white">
                <div className="absolute left-1/2 top-2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
                {children}
            </div>
        </div>
    );
}

function StatCard({ icon, iconClass, value, label, progress, onClick, interactive }) {
    const content = (
        <>
            <GymIcon name={icon} className={`size-5 ${iconClass}`} />
            <span className="mt-2 text-sm font-bold tabular-nums">{value}</span>
            <span className="text-[10px] text-white/60">{label}</span>
            <span className="mt-2 h-1 w-full overflow-hidden rounded-full bg-black/60">
                <span
                    className="block h-full rounded-full bg-[var(--g-primary)] transition-[width] duration-500 ease-out"
                    style={{ width: `${Math.min(progress, 1) * 100}%` }}
                />
            </span>
        </>
    );
    const className = `${CARD} flex flex-col items-center px-2 py-3 transition-transform`;

    return interactive ? (
        <button type="button" onClick={onClick} className={`${className} cursor-pointer active:scale-95 hover:border-[var(--g-primary)]/60`}>
            {content}
        </button>
    ) : (
        <div className={className}>{content}</div>
    );
}

function HomeScreen({ state, copy, onAction, interactive }) {
    const { water, meals, missions, coins, streak, xp } = state;

    return (
        <div className="flex flex-col gap-3 px-3.5 pb-4 pt-10">
            <header className="flex items-center gap-2.5">
                <span className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-white/60 bg-[#1b2440] text-lg font-semibold">
                    {copy.user[0]}
                </span>
                <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold leading-tight">{copy.user}</p>
                    <p className="text-[9px] text-[var(--g-primary)]">{copy.level}</p>
                    <span className="mt-1 block h-1 w-20 overflow-hidden rounded-full bg-white/20">
                        <span className="block h-full bg-[var(--g-primary)] transition-[width] duration-500" style={{ width: `${xp}%` }} />
                    </span>
                </div>
                <span className="flex items-center gap-0.5 text-[11px] font-bold tabular-nums">
                    <GymIcon name="coin" className="size-3.5 text-[var(--g-primary)]" />{coins}
                </span>
                <span className="flex items-center gap-0.5 text-[11px] font-bold tabular-nums">
                    <GymIcon name="drop" className="size-3.5 text-[var(--g-primary)]" />{streak}d
                </span>
                <span className="grid size-7 place-items-center rounded-full border border-[var(--g-primary)] text-[var(--g-primary)]">
                    <GymIcon name="store" className="size-3.5" />
                </span>
            </header>

            <p className="mt-1 text-center text-xs font-semibold">{copy.todayPlans}</p>
            <div className="grid grid-cols-3 gap-2">
                <StatCard
                    icon="drop" iconClass="text-sky-400" value={`${water}ml`} label={copy.hydration}
                    progress={water / GYM_LIMITS.water} onClick={() => onAction('water')} interactive={interactive}
                />
                <StatCard
                    icon="dish" iconClass="text-white/80" value={`${meals}/${GYM_LIMITS.meals}`} label={copy.meals}
                    progress={meals / GYM_LIMITS.meals} onClick={() => onAction('meal')} interactive={interactive}
                />
                <StatCard
                    icon="star" iconClass="text-amber-400" value={`${missions}/${GYM_LIMITS.missions}`} label={copy.missions}
                    progress={missions / GYM_LIMITS.missions} onClick={() => onAction('mission')} interactive={interactive}
                />
            </div>

            <section className={`${CARD} p-3`}>
                <p className="flex items-center gap-1.5 text-xs font-semibold">
                    <GymIcon name="flame" className="size-4 text-[var(--g-primary)]" />
                    {copy.todayGoal}
                    <GymIcon name="chevron" className="ml-auto size-4 text-white/60" />
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5 text-[9px] font-semibold">
                    {[`2095 ${copy.kcal}`, `92 ${copy.protein}`, `47 ${copy.fat}`, `327 ${copy.carbs}`].map((item) => (
                        <span key={item} className="rounded-md bg-black/70 px-2 py-1">{item}</span>
                    ))}
                </div>
            </section>

            <p className="text-center text-xs font-semibold">{copy.todayWorkout}</p>
            <section className="rounded-2xl border border-[var(--g-primary)]/60 bg-white/[0.03] p-3">
                <p className="text-xs font-bold text-[var(--g-primary)]">{copy.workoutName}</p>
                <p className="mt-1 text-[9px] text-white/70">{copy.exercises} <span className="mx-1 text-white/30">|</span> {copy.minutes}</p>
                <button
                    type="button"
                    tabIndex={interactive ? 0 : -1}
                    onClick={() => interactive && onAction('locked')}
                    className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[var(--g-primary)] py-2.5 text-xs font-bold text-black shadow-[0_0_18px_-4px_var(--g-primary)] transition-transform active:scale-95"
                >
                    <GymIcon name="fitness" className="size-4" />
                    {copy.start}
                </button>
            </section>

            <p className="text-center text-xs font-semibold">{copy.running}</p>
            <button
                type="button"
                tabIndex={interactive ? 0 : -1}
                onClick={() => interactive && onAction('locked')}
                className="flex items-center gap-2 rounded-xl border border-[var(--g-primary)]/50 px-3 py-2.5 text-left text-[10px] text-white/80"
            >
                <GymIcon name="run" className="size-4 shrink-0 text-[var(--g-primary)]" />
                {copy.runHint}
            </button>
        </div>
    );
}

function SoonScreen({ copy }) {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-2 px-8 text-center">
            <span className="grid size-12 place-items-center rounded-full border border-[var(--g-primary)]/60 text-[var(--g-primary)]">
                <GymIcon name="fitness" className="size-6" />
            </span>
            <p className="text-sm font-bold">{copy.soonTitle}</p>
            <p className="text-[11px] text-white/60">{copy.soonText}</p>
        </div>
    );
}

const TABS = [
    { id: 'home', icon: 'home' },
    { id: 'activities', icon: 'fitness' },
    { id: 'profile', icon: 'person' },
];

/** Tela do app. Sem `interactive`, vira uma vitrine estática (usada na home). */
export default function GymPhone({ state, theme, copy, label, tab = 'home', onTab, onAction, onToast, toast, interactive = false, className }) {
    return (
        <PhoneFrame theme={theme} label={label} className={className}>
            <div className="absolute inset-0 overflow-y-auto pb-14 [scrollbar-width:none]" inert={!interactive}>
                {tab === 'home' && <HomeScreen state={state} copy={copy} onAction={onAction} interactive={interactive} />}
                {tab === 'activities' && <GymActivitiesScreen copy={copy} onToast={onToast} />}
                {tab === 'profile' && <SoonScreen copy={copy} />}
            </div>

            <div
                aria-live="polite"
                className={`pointer-events-none absolute inset-x-0 bottom-14 z-10 bg-[var(--g-primary)] px-4 py-2 text-[11px] font-semibold text-black transition-all duration-300 ${toast ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
            >
                {toast}
            </div>

            <nav className="absolute inset-x-0 bottom-0 z-10 flex h-14 border-t border-white/5 bg-[#060910]" inert={!interactive}>
                {TABS.map((item) => {
                    const active = item.id === tab;
                    return (
                        <button
                            key={item.id}
                            type="button"
                            aria-current={active ? 'page' : undefined}
                            onClick={() => onTab?.(item.id)}
                            className={`flex flex-1 flex-col items-center justify-center gap-0.5 text-[9px] transition-colors ${active ? 'text-[var(--g-primary)]' : 'text-white/50 hover:text-white/80'}`}
                        >
                            <GymIcon name={item.icon} className="size-5" />
                            {copy.tabs[item.id]}
                        </button>
                    );
                })}
            </nav>
        </PhoneFrame>
    );
}
