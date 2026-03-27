import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-purple-600/15 text-purple-400 border border-purple-500/30 hover:bg-purple-500 hover:text-white hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]",
                primary:
                    "bg-gradient-to-b from-purple-500 to-purple-700 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:from-purple-400 hover:to-purple-600 border border-purple-400/50",
                secondary:
                    "bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white hover:border-white/20",
                ghost: "hover:bg-white/10 text-zinc-400 hover:text-white",
                link: "text-purple-400 underline-offset-4 hover:underline",
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
    ({ className, variant, size, ...props }, ref) => {
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
