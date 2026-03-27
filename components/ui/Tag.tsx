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
                    "border-[var(--star-color)]/30 bg-[var(--star-color)]/10 text-[var(--star-color)] hover:bg-[var(--star-color)]/20",
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
