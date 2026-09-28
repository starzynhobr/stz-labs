import GymAvatar from './GymAvatar';
import GymIcon from './GymIcons';

const MENU = [
    { id: 'rank', icon: 'medal' },
    { id: 'dashboard', icon: 'dashboard' },
    { id: 'editProfile', icon: 'edit', highlight: true },
    { id: 'editPlan', icon: 'tune' },
    { id: 'nutrition', icon: 'flame' },
    { id: 'achievements', icon: 'trophy', badge: '0/34' },
    { id: 'skills', icon: 'tree' },
];

export default function GymProfileScreen({ state, copy, onToast }) {
    const locked = () => onToast(copy.onlyInApp);

    return (
        <div className="flex flex-col items-center gap-3 px-3.5 pb-4 pt-12">
            <GymAvatar letter={copy.user[0]} borderId={state.border} className="size-24 text-3xl" />
            <p className="text-lg font-bold">{copy.user}</p>
            <button
                type="button"
                onClick={locked}
                className="flex items-center gap-1.5 rounded-xl border border-[var(--g-primary)]/60 bg-[var(--g-primary)]/15 px-3 py-1.5 text-[11px] text-[var(--g-primary)] shadow-[0_0_14px_-6px_var(--g-primary)]"
            >
                <GymIcon name="shield" className="size-3.5" />
                <span className="text-white">{copy.levelFull}</span>
                <GymIcon name="expand" className="size-3.5" />
            </button>

            <div className="mt-2 flex w-full items-center gap-2.5 rounded-2xl border border-white/10 bg-black/40 p-2.5">
                <span className="grid size-8 place-items-center rounded-lg bg-amber-400 text-sm font-bold text-black">G</span>
                <span className="flex-1 text-xs font-semibold">{copy.google}</span>
                <button type="button" onClick={locked} className="flex items-center gap-1 rounded-lg border border-white/20 px-2.5 py-1 text-[10px] font-semibold">
                    <GymIcon name="login" className="size-3.5" />
                    {copy.connectAccount}
                </button>
            </div>

            <ul className="flex w-full flex-col gap-2">
                {MENU.map((item) => (
                    <li key={item.id}>
                        <button
                            type="button"
                            onClick={locked}
                            className={`flex w-full items-center justify-center gap-2 rounded-2xl py-2.5 text-xs font-semibold transition-colors ${item.highlight
                                ? 'bg-[var(--g-primary)] text-black shadow-[0_0_18px_-6px_var(--g-primary)]'
                                : 'border border-white/10 bg-black/40 hover:border-white/25'}`}
                        >
                            <GymIcon name={item.icon} className="size-4" />
                            {copy.profileMenu[item.id]}
                            {item.badge && <span className="rounded-full bg-amber-400 px-1.5 py-0.5 text-[8px] font-bold text-black">{item.badge}</span>}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
