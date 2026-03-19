import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "outline" | "ghost" | "neo";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-bold transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2";
    
    const variants = {
      default: "bg-surface-container text-surface-on-surface hover:bg-surface-container-high",
      primary: "bg-primary text-on-primary hover:bg-primary-container",
      secondary: "bg-secondary-container text-on-secondary hover:bg-secondary-fixed",
      outline: "border-2 border-outline bg-transparent hover:bg-surface-container",
      ghost: "hover:bg-surface-container",
      neo: "bg-surface-container-lowest border-2 border-[#1A1A1A] text-[#1A1A1A] hard-shadow-sm active-press hover:bg-jlpt-n3",
    };
    
    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-5 text-base",
      lg: "h-13 px-7 text-lg",
    };
    
    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
