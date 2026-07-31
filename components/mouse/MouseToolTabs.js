"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';

/**
 * Abas navegáveis: cada uma é um Link real, então cada ferramenta tem URL
 * própria e indexável. O prefetch do Next deixa a troca instantânea.
 */
export default function MouseToolTabs({ tabs }) {
    const pathname = usePathname();

    return (
        <div className="flex gap-1 overflow-x-auto p-1 rounded-full bg-[var(--surface-3)] border [border-color:var(--border-subtle)] w-fit max-w-full">
            {tabs.map((tab) => {
                const isActive = pathname === tab.href;

                return (
                    <Link
                        key={tab.id}
                        href={tab.href}
                        prefetch
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                            'whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
                            isActive
                                ? 'bg-[var(--accent)] text-[var(--text-on-accent)] shadow-[0_0_18px_var(--accent-glow)]'
                                : 'text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-heading)]'
                        )}
                    >
                        {tab.label}
                    </Link>
                );
            })}
        </div>
    );
}
