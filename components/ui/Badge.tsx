import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-[var(--accent)]/15 text-[var(--accent)] hover:bg-[var(--accent)]/25",
                secondary:
                    "border-transparent bg-[var(--surface-3)] text-[var(--text-secondary)] hover:bg-[var(--surface-3)]/80",
                destructive:
                    "border-transparent bg-red-500/15 text-red-500 hover:bg-red-500/25",
                outline: "text-[var(--text-secondary)] border-[var(--border-strong)]",
                stable: "border-transparent bg-[var(--status-stable)]/10 text-[var(--status-stable)] hover:bg-[var(--status-stable)]/20",
                beta: "border-transparent bg-[var(--status-beta)]/10 text-[var(--status-beta)] hover:bg-[var(--status-beta)]/20",
                alpha: "border-transparent bg-[var(--status-alpha)]/10 text-[var(--status-alpha)] hover:bg-[var(--status-alpha)]/20",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
