import type { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useMemo } from "react";
import { FINANCIAL_ICONS } from "../constants/iconSelector.constants";

export function getIconComponent(iconName: string): LucideIcon | null {
  const icons = LucideIcons as Record<string, unknown>;
  const IconComponent = icons[iconName];

  if (typeof IconComponent !== "object") return null;

  return IconComponent as LucideIcon;
}

export function useIcon(iconName?: string) {
  return useMemo(() => {
    if (!iconName || !FINANCIAL_ICONS.includes(iconName)) {
      return null;
    }
    return getIconComponent(iconName);
  }, [iconName]);
}

export function isValidIcon(iconName: string): boolean {
  return FINANCIAL_ICONS.includes(iconName);
}
