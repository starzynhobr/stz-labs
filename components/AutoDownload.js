"use client";

import { useEffect } from 'react';

const START_DELAY_MS = 700;

/**
 * Dispara o download depois que a página aparece, para a pessoa ver a mensagem
 * antes do diálogo do navegador. Sem JavaScript, o link manual continua ali.
 */
export default function AutoDownload({ url }) {
    useEffect(() => {
        if (!url) return undefined;

        const timer = window.setTimeout(() => {
            window.location.assign(url);
        }, START_DELAY_MS);

        return () => window.clearTimeout(timer);
    }, [url]);

    return null;
}
