import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const tagVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800",
                stars:
                    "border-amber-500/30 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
                accent:
                    "border-purple-500/30 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20",
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
