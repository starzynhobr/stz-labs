import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 hover:bg-[var(--accent)] hover:text-[var(--text-on-accent)] hover:border-[var(--accent)] hover:shadow-[0_0_20px_var(--accent-glow)]",
                primary:
                    "bg-gradient-to-b from-[var(--accent)] to-[var(--accent)]/80 text-[var(--text-on-accent)] shadow-[0_0_15px_var(--accent-glow)] hover:shadow-[0_0_25px_var(--accent-glow)] hover:opacity-90 border border-[var(--accent)]/30",
                secondary:
                    "bg-[var(--surface-2)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--surface-3)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]",
                ghost: "hover:bg-[var(--surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                link: "text-[var(--accent)] underline-offset-4 hover:underline",
            },
            size: {
                default: "h-11 px-6 py-2",
                sm: "h-9 px-4 text-xs",
                lg: "h-12 rounded-xl px-8 text-base",
                icon: "h-11 w-11",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild: _asChild, ...props }, ref) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _ = _asChild;
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
