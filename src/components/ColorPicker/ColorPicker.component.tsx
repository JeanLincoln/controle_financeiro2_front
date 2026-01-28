import React from "react";
import { Palette } from "lucide-react";

import { Button } from "@/components/Button/Button.component";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/Popover/Popover.component";
import { cn } from "@/utils/cn.utils";

import { PRESET_COLORS } from "./constants/colorPicker.constants";

interface AdvancedColorPickerProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export const ColorPicker = React.forwardRef<
  HTMLInputElement,
  AdvancedColorPickerProps
>(({ className, value = "#000000", onChange, disabled, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleColorSelect = (color: string) => {
    onChange?.(color);
    setIsOpen(false);
  };

  const handleCustomColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange?.(event.target.value);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-10 w-auto gap-2 px-3"
            disabled={disabled}
          >
            <div
              className="border-border h-4 w-4 rounded border"
              style={{ backgroundColor: value }}
            />
            <Palette className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3">
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Selecione uma cor</h4>
            <div className="grid grid-cols-6 gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={cn(
                    "h-8 w-8 rounded border-2 transition-transform hover:scale-110",
                    value === color ? "border-foreground" : "border-border"
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                  title={color}
                />
              ))}
            </div>
            <div className="space-y-2">
              <label className="text-muted-foreground text-sm">
                Cor personalizada
              </label>
              <div className="flex items-center gap-2">
                <input
                  ref={ref}
                  type="color"
                  value={value}
                  onChange={handleCustomColorChange}
                  className="border-input h-8 w-12 cursor-pointer rounded border"
                  disabled={disabled}
                  {...props}
                />
                <span className="text-muted-foreground font-mono text-sm">
                  {value.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <div className="flex items-center gap-2">
        <div
          className="border-input h-6 w-6 rounded border"
          style={{ backgroundColor: value }}
          title={`Cor selecionada: ${value}`}
        />
        <span className="text-muted-foreground font-mono text-sm">
          {value.toUpperCase()}
        </span>
      </div>
    </div>
  );
});
