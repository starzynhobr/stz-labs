import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-purple-600/20 text-purple-400 hover:bg-purple-600/30",
                secondary:
                    "border-transparent bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
                destructive:
                    "border-transparent bg-red-900/40 text-red-400 hover:bg-red-900/60",
                outline: "text-zinc-300 border-zinc-700",
                stable: "border-transparent bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20",
                beta: "border-transparent bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
                alpha: "border-transparent bg-purple-500/10 text-purple-400 hover:bg-purple-500/20",
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
