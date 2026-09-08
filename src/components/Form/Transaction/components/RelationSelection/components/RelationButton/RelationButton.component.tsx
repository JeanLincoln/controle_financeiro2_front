import type { ReactNode } from "react";

import { cn } from "@/utils/cn.utils";

type RelationButtonProps = {
  icon: ReactNode;
  title: string;
  isOpen: boolean;
  isDisabled?: boolean;
  onClick: () => void;
};

export function RelationButton({
  icon,
  title,
  isOpen,
  isDisabled = false,
  onClick
}: RelationButtonProps) {
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      disabled={isDisabled}
      onClick={onClick}
      className={cn(
        "bg-card border-border hover:border-primary/50 focus-visible:ring-ring flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        isOpen && "border-primary bg-primary/5 text-primary"
      )}
    >
      {icon}
      {title}
    </button>
  );
}
