import { Check, Pencil } from "lucide-react";

import { Button } from "@/components/Button/Button.component";
import { getIconComponent } from "@/components/IconSelector/utils/iconSelector.utils";
import { cn } from "@/utils/cn.utils";
import { getContrastTextColor } from "@/utils/getContrastTextColor.utils";

type RelationOption = {
  id: number;
  name: string;
  description: string;
  color: string;
  icon: string;
};

type RelationOptionCardProps = {
  option: RelationOption;
  isSelected: boolean;
  onSelect: () => void;
  onEdit?: () => void;
};

export function RelationOptionCard({
  option,
  isSelected,
  onSelect,
  onEdit
}: RelationOptionCardProps) {
  const Icon = getIconComponent(option.icon);

  return (
    <div
      className={cn(
        "bg-card border-border relative flex min-h-20 w-full items-center gap-3 rounded-xl border p-3 text-left transition-all sm:w-[calc(50%-0.375rem)] xl:w-[calc(33.333%-0.5rem)]",
        isSelected && "border-primary bg-primary/5 ring-primary/20 ring-2"
      )}
    >
      <button
        type="button"
        aria-label={`Selecionar ${option.name}`}
        aria-pressed={isSelected}
        onClick={onSelect}
        className="hover:border-primary/50 focus-visible:ring-ring absolute inset-0 rounded-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      />
      <div
        className="pointer-events-none flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: option.color }}
      >
        {Icon && (
          <Icon
            className={cn(
              "h-5 w-5 fill-none",
              getContrastTextColor(option.color)
            )}
          />
        )}
      </div>
      <div className="pointer-events-none min-w-0 flex-1">
        <p className="truncate font-medium">{option.name}</p>
        <p className="text-muted-foreground line-clamp-1 text-sm">
          {option.description || "Sem descrição"}
        </p>
      </div>
      <span
        className={cn(
          "border-muted-foreground/40 pointer-events-none flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
          isSelected && "bg-primary border-primary text-primary-foreground"
        )}
      >
        {isSelected && <Check className="h-3.5 w-3.5" />}
      </span>
      {onEdit && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={`Editar origem ${option.name}`}
          className="relative z-10 shrink-0"
          onClick={onEdit}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
