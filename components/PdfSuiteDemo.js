"use client";

import Image from 'next/image';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/Button';

export default function PdfSuiteDemo() {
    const [playing, setPlaying] = useState(false);
    const { t } = useLanguage();

    return (
        <div className="space-y-4">
            <div className="relative aspect-[72/55] overflow-hidden rounded-[var(--radius-card)] border [border-color:var(--border-subtle)] bg-[var(--surface-primary)]">
                <Image
                    src={playing ? '/images/projects/stz-pdf-suite/v040/07-demo-unir-pdfs.gif' : '/images/projects/stz-pdf-suite/v040/01-unir-pdfs.png'}
                    alt={t('pdf_suite.showcase.merge_title')}
                    fill
                    unoptimized={playing}
                    sizes="(max-width: 768px) 100vw, 640px"
                    className="object-contain"
                />
            </div>
            <Button type="button" variant="secondary" aria-pressed={playing} onClick={() => setPlaying(!playing)}>
                {t(playing ? 'pdf_suite.landing.stop' : 'pdf_suite.landing.play')}
            </Button>
        </div>
    );
}
