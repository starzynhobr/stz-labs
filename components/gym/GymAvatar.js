import { GYM_BORDERS } from '../../data/stzGym';

/** Avatar com a borda equipada; sem borda, usa o anel branco padrão do app. */
export default function GymAvatar({ letter, borderId, className = 'size-11 text-lg' }) {
    const border = GYM_BORDERS.find((item) => item.id === borderId);

    return (
        <span
            className={`grid shrink-0 place-items-center rounded-full p-[3px] transition-[background] duration-500 ${className}`}
            style={{ background: border ? `conic-gradient(${border.ring})` : 'rgba(255,255,255,0.6)' }}
        >
            <span className="grid size-full place-items-center rounded-full border-2 border-[#0a0f1d] bg-[#1b2440] font-semibold">
                {letter}
            </span>
        </span>
    );
}
