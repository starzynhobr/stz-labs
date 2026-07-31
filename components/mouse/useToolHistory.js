"use client";

import { useCallback, useEffect, useState } from 'react';

const MAX_ITEMS = 12;

/** Histórico local por ferramenta. Some se o armazenamento estiver bloqueado. */
export function useToolHistory(key) {
    const storageKey = `stz-mouse:${key}`;
    const [items, setItems] = useState([]);

    useEffect(() => {
        try {
            const raw = window.localStorage.getItem(storageKey);
            const parsed = raw ? JSON.parse(raw) : [];
            // eslint-disable-next-line react-hooks/set-state-in-effect
            if (Array.isArray(parsed)) setItems(parsed.slice(0, MAX_ITEMS));
        } catch {
            // Sem histórico é um estado válido.
        }
    }, [storageKey]);

    const push = useCallback((entry) => {
        setItems((current) => {
            const next = [entry, ...current].slice(0, MAX_ITEMS);
            try {
                window.localStorage.setItem(storageKey, JSON.stringify(next));
            } catch {
                // Ignorado de propósito: o histórico é conveniência, não requisito.
            }
            return next;
        });
    }, [storageKey]);

    const clear = useCallback(() => {
        setItems([]);
        try {
            window.localStorage.removeItem(storageKey);
        } catch {
            // Idem.
        }
    }, [storageKey]);

    return { items, push, clear };
}
