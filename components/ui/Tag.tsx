import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const tagVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-[var(--border-subtle)] bg-[var(--surface-2)] text-[var(--text-secondary)] hover:bg-[var(--surface-3)]",
                stars:
                    "border-amber-500/30 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
                accent:
                    "border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)]/20",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface TagProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof tagVariants> {}

function Tag({ className, variant, ...props }: TagProps) {
    return (
        <div className={cn(tagVariants({ variant }), className)} {...props} />
    );
}

export { Tag, tagVariants };
