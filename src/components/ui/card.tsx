import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative overflow-hidden rounded-xl border transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default: [
          "bg-card text-card-foreground shadow-sm border-border",
          "hover:shadow-md hover:-translate-y-0.5",
        ],
        elevated: [
          "bg-card text-card-foreground shadow-lg border-border/50",
          "hover:shadow-xl hover:-translate-y-1",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none",
        ],
        glass: [
          "bg-white/10 dark:bg-white/5 text-foreground backdrop-blur-md border-white/20 dark:border-white/10",
          "shadow-lg shadow-black/5 dark:shadow-black/20",
          "hover:bg-white/5 dark:hover:bg-white/0 hover:shadow-xl",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:pointer-events-none",
        ],
        gradient: [
          "bg-gradient-to-br from-primary/5 via-background to-secondary/5 text-foreground",
          "border-gradient-to-br border-from-primary/20 border-to-secondary/20",
          "shadow-lg shadow-primary/5",
          "hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-0.5",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-secondary/5 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:pointer-events-none",
        ],
        glow: [
          "bg-card text-card-foreground border-primary/20",
          "shadow-lg shadow-primary/10",
          "hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 hover:border-primary/30",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:pointer-events-none",
          "after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-br after:from-transparent after:via-primary/5 after:to-transparent after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100 after:pointer-events-none",
        ],
      },
      size: {
        sm: "p-4 gap-4",
        default: "py-6 gap-6",
        lg: "py-8 gap-8",
      },
      interactive: {
        true: "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      interactive: false,
    },
  }
);

interface CardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

function Card({ className, variant, size, interactive, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        cardVariants({ variant, size, interactive }),
        "flex flex-col",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6",
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        "[.border-b]:pb-6 [.border-b]:border-border/50",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-semibold leading-tight tracking-tight",
        "text-lg text-foreground",
        "bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-sm text-muted-foreground leading-relaxed",
        "max-w-prose",
        className
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        "flex items-center gap-2",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 flex-1", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center px-6 mt-auto",
        "[.border-t]:pt-6 [.border-t]:border-border/50",
        className
      )}
      {...props}
    />
  );
}

// Enhanced card variants for specific use cases
function FeatureCard({ className, children, ...props }: CardProps) {
  return (
    <Card
      variant="elevated"
      interactive
      className={cn(
        "group relative overflow-hidden",
        "hover:shadow-2xl hover:shadow-primary/10",
        "transition-all duration-500 ease-out",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">{children}</div>
    </Card>
  );
}

function GlassCard({ className, children, ...props }: CardProps) {
  return (
    <Card
      variant="glass"
      className={cn(
        "backdrop-blur-xl bg-white/10 dark:bg-black/10",
        "border border-white/20 dark:border-white/10",
        "shadow-2xl shadow-black/10 dark:shadow-black/30",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}

function GradientCard({ className, children, ...props }: CardProps) {
  return (
    <Card
      variant="gradient"
      className={cn(
        "bg-gradient-to-br from-primary/10 via-background to-secondary/10",
        "border-0 shadow-xl shadow-primary/5",
        "relative overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none",
        className
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </Card>
  );
}

function GlowCard({ className, children, ...props }: CardProps) {
  return (
    <Card
      variant="glow"
      interactive
      className={cn(
        "group relative",
        "hover:shadow-2xl hover:shadow-primary/20",
        "transition-all duration-500 ease-out",
        className
      )}
      {...props}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm" />
      <div className="relative z-10">{children}</div>
    </Card>
  );
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  // Enhanced variants
  FeatureCard,
  GlassCard,
  GlowCard,
  GradientCard,
  // Types
  type CardProps,
};
