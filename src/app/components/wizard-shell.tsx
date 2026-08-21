import { ReactNode } from "react";
import { motion } from "motion/react";

export function MakeKitButton({
  children,
  onClick,
  variant = "primary",
  disabled,
  size = "md",
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "neutral" | "subtle" | "ghost";
  disabled?: boolean;
  size?: "sm" | "md";
  "aria-label"?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-[8px] border-[1.5px] border-app-border rounded-[10px] select-none disabled:opacity-40 disabled:cursor-not-allowed";
  const sizes = size === "sm" ? "px-[14px] py-[8px] text-[13px]" : "px-[20px] py-[10px] text-[15px]";
  const styles = {
    primary: "bg-app-ink text-app-ink-fg hover:bg-app-ink-hover",
    neutral: "bg-app-surface text-app-text-primary hover:bg-app-surface-warm",
    subtle:  "bg-secondary text-app-text-primary border-border hover:bg-muted",
    ghost:   "bg-transparent text-app-text-primary border-transparent hover:bg-app-surface-warm",
  }[variant];
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.96, y: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className={`${base} ${sizes} ${styles}`}
    >
      {children}
    </motion.button>
  );
}

export function MakeKitTag({
  children,
  selected,
  onClick,
  scheme = "neutral",
}: {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  scheme?: "neutral" | "brand" | "positive";
}) {
  const colors = selected
    ? scheme === "positive"
      ? "bg-app-positive text-app-positive-fg border-app-border"
      : "bg-app-ink text-app-ink-fg border-app-border"
    : "bg-app-surface text-app-text-primary border-app-border hover:bg-app-surface-hover";
  return (
    <motion.button
      onClick={onClick}
      aria-pressed={selected ?? false}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 600, damping: 24 }}
      className={`inline-flex items-center gap-[6px] border-[1.5px] rounded-[8px] px-[12px] py-[8px] text-[13px] min-h-[36px] ${colors}`}
    >
      {children}
    </motion.button>
  );
}

export function StepHeader({
  step,
  total,
  title,
  subtitle,
}: {
  step: number;
  total: number;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex items-center gap-[10px] text-[12px] tracking-[0.08em] uppercase" aria-hidden="true">
        <span className="border-[1.5px] border-app-border px-[8px] py-[2px] bg-app-accent text-app-accent-fg">
          Step {String(step).padStart(2, "0")}
        </span>
        <span className="text-app-text-muted">of {String(total).padStart(2, "0")}</span>
      </div>
      <h1 className="text-[44px] leading-[1.05] tracking-[-0.02em] text-app-text-primary">{title}</h1>
      <p className="text-[18px] text-app-text-secondary max-w-[640px]">{subtitle}</p>
    </div>
  );
}

export function ProgressBar({ value, step, total }: { value: number; step?: number; total?: number }) {
  const label = step != null && total != null
    ? `Step ${step} of ${total}`
    : `${Math.round(value)}% complete`;
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className="w-full h-[10px] border-[1.5px] border-app-border bg-app-surface"
    >
      <div className="h-full bg-app-ink transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}
