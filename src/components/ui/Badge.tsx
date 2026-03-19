import * as React from "react";
import { cn } from "@/lib/utils";
import type { JLPTLevel } from "@/types";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: JLPTLevel | "default" | "outline";
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border-2 border-[#1A1A1A]";
    
    const variants: Record<string, string> = {
      default: "bg-surface-container text-surface-on-surface",
      outline: "bg-transparent text-outline",
      N5: "bg-jlpt-n5 text-[#1A1A1A]",
      N4: "bg-jlpt-n4 text-[#1A1A1A]",
      N3: "bg-jlpt-n3 text-[#1A1A1A]",
      N2: "bg-jlpt-n2 text-[#1A1A1A]",
      N1: "bg-jlpt-n1 text-[#1A1A1A]",
    };
    
    return (
      <span
        className={cn(baseStyles, variants[variant], className)}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";

export { Badge };
