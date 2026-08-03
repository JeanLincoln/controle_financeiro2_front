import { Check } from "lucide-react";

import { getIconComponent } from "@/components/IconSelector/utils/iconSelector.utils";
import { cn } from "@/utils/cn.utils";

export interface DetailsCardProps {
  id: number;
  name: string;
  description: string;
  color: string;
  icon: string;
  isSelected: boolean;
  onClick: () => void;
}

export const DetailsCard = ({
  id,
  name,
  description,
  color,
  icon,
  isSelected,
  onClick
}: DetailsCardProps) => {
  const SelectedIcon = getIconComponent(icon);

  return (
    <div
      key={id}
      className="border-border relative flex h-18 w-full max-w-[200px] cursor-pointer flex-col items-start justify-start rounded border p-4.5 transition-all ease-in-out hover:scale-105"
      style={{
        backgroundColor: color + "20"
      }}
      onClick={onClick}
    >
      <span className="line-clamp-1 leading-none font-semibold">{name}</span>
      <span className="text-muted-foreground line-clamp-1 text-sm">
        {description}
      </span>
      {SelectedIcon && (
        <div
          style={{ backgroundColor: color }}
          className="absolute top-[-10px] left-[-10px] rounded-full p-1"
        >
          <SelectedIcon className="text-secondary h-5 w-5" />
        </div>
      )}
      <div className="absolute top-[-10px] right-[-10px] rounded-full p-1">
        <Check
          className={cn(
            "h-6 w-6 shrink-0 scale-0 rounded-full bg-green-500 p-1 text-white opacity-0 transition-all ease-in-out",
            isSelected && "scale-100 opacity-100"
          )}
        />
      </div>
    </div>
  );
};
