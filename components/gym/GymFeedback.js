"use client";

import { useEffect, useState } from 'react';
import { GYM_POLL_OPTIONS } from '../../data/stzGym';

const ENDPOINT = '/api/gym-feedback';
const STORAGE_KEY = 'stz-gym-feedback';

/** Lembra no navegador o que a pessoa já fez; falhas de storage são ignoradas. */
const readLocal = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
        return {};
    }
};

const writeLocal = (patch) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readLocal(), ...patch }));
    } catch {
        // Modo privado ou storage bloqueado: segue sem lembrar.
    }
};

async function send(payload) {
    const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'error');
    return data;
}

const CARD = 'rounded-[var(--radius-card)] border [border-color:var(--border-subtle)] bg-[var(--surface-primary)] p-6 backdrop-blur-[var(--backdrop-blur)]';

export default function GymFeedback({ text }) {
    const [counts, setCounts] = useState(null);
    const [available, setAvailable] = useState(true);
    const [local, setLocal] = useState({});
    const [busy, setBusy] = useState(null);
    const [message, setMessage] = useState(null);
    const [suggestion, setSuggestion] = useState('');
    const [honeypot, setHoneypot] = useState('');

    useEffect(() => {
        setLocal(readLocal());
        fetch(ENDPOINT)
            .then((response) => (response.ok ? response.json() : Promise.reject()))
            .then(setCounts)
            .catch(() => setAvailable(false));
    }, []);

    const remember = (patch) => {
        writeLocal(patch);
        setLocal((prev) => ({ ...prev, ...patch }));
    };

    const errorText = (error) => (error.message === 'rate_limited' ? text.errorLimit : text.errorGeneric);

    const submit = async (kind, payload, onSuccess) => {
        setBusy(kind);
        setMessage(null);
        try {
            const data = await send({ ...payload, website: honeypot });
            if (data.likes !== undefined) setCounts({ likes: data.likes, votes: data.votes });
            onSuccess();
        } catch (error) {
            setMessage({ kind, text: errorText(error) });
        } finally {
            setBusy(null);
        }
    };

    const like = () => submit('like', { type: 'like' }, () => remember({ liked: true }));
    const vote = (option) => submit('vote', { type: 'vote', option }, () => remember({ voted: option }));
    const sendSuggestion = (event) => {
        event.preventDefault();
        submit('suggestion', { type: 'suggestion', text: suggestion }, () => {
            setSuggestion('');
            setMessage({ kind: 'suggestion', text: text.sent, ok: true });
        });
    };

    if (!available) {
        return <p className="text-center text-sm text-[var(--text-muted)]">{text.offline}</p>;
    }

    const totalVotes = counts ? Object.values(counts.votes).reduce((sum, value) => sum + value, 0) : 0;
    const showMessage = (kind) => message?.kind === kind && (
        <p role="status" className={`mt-3 text-xs ${message.ok ? 'text-emerald-400' : 'text-red-400'}`}>{message.text}</p>
    );

    return (
        <div className="grid gap-4 md:grid-cols-2">
            <div className={`${CARD} flex flex-col items-center justify-center gap-3 text-center`}>
                <button
                    type="button"
                    onClick={like}
                    disabled={local.liked || busy === 'like'}
                    className="group inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-6 py-3 font-semibold text-[var(--text-heading)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)]/20 disabled:cursor-default disabled:opacity-80"
                >
                    <span aria-hidden="true" className="transition-transform group-enabled:group-hover:scale-125">🔥</span>
                    {local.liked ? text.liked : text.like}
                    <span className="ml-1 rounded-full bg-black/20 px-2 py-0.5 text-xs tabular-nums">{counts?.likes ?? '—'}</span>
                </button>
                {showMessage('like')}
            </div>

            <div className={CARD}>
                <p className="mb-4 text-sm font-semibold text-[var(--text-heading)]">{text.pollTitle}</p>
                <div className="flex flex-col gap-2">
                    {GYM_POLL_OPTIONS.map((option) => {
                        const votes = counts?.votes[option] || 0;
                        const share = totalVotes ? Math.round((votes / totalVotes) * 100) : 0;
                        const chosen = local.voted === option;
                        return (
                            <button
                                key={option}
                                type="button"
                                onClick={() => vote(option)}
                                disabled={Boolean(local.voted) || busy === 'vote'}
                                aria-pressed={chosen}
                                className={`relative overflow-hidden rounded-lg border px-3 py-2 text-left text-sm transition-colors enabled:hover:border-[var(--accent)] ${chosen ? 'border-[var(--accent)]' : '[border-color:var(--border-subtle)]'}`}
                            >
                                {local.voted && (
                                    <span className="absolute inset-y-0 left-0 bg-[var(--accent)]/15 transition-[width] duration-700" style={{ width: `${share}%` }} aria-hidden="true" />
                                )}
                                <span className="relative flex justify-between gap-2 text-[var(--text-primary)]">
                                    {text.poll[option]}
                                    {local.voted && <span className="tabular-nums text-[var(--text-muted)]">{share}%</span>}
                                </span>
                            </button>
                        );
                    })}
                </div>
                {showMessage('vote')}
            </div>

            <form onSubmit={sendSuggestion} className={`${CARD} md:col-span-2`}>
                <label htmlFor="gym-suggestion" className="mb-3 block text-sm font-semibold text-[var(--text-heading)]">{text.suggestion}</label>
                {/* Honeypot fora da tela: pessoas não veem, robôs preenchem. */}
                <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(event) => setHoneypot(event.target.value)}
                    className="absolute -left-[9999px] size-px opacity-0"
                    aria-hidden="true"
                />
                <div className="flex flex-col gap-3 sm:flex-row">
                    <textarea
                        id="gym-suggestion"
                        value={suggestion}
                        onChange={(event) => setSuggestion(event.target.value)}
                        maxLength={500}
                        rows={2}
                        placeholder={text.suggestionPlaceholder}
                        className="min-h-[3rem] flex-1 resize-y rounded-lg border [border-color:var(--border-subtle)] bg-black/10 px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                    />
                    <button
                        type="submit"
                        disabled={suggestion.trim().length < 3 || busy === 'suggestion'}
                        className="rounded-lg bg-[var(--accent)] px-6 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40 sm:self-end"
                    >
                        {text.send}
                    </button>
                </div>
                {showMessage('suggestion')}
            </form>
        </div>
    );
}
