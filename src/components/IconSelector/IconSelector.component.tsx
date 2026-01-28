import { ChevronDown, Search, X } from "lucide-react";

import { Badge } from "@/components/Badge/Badge.component";
import { Button } from "@/components/Button/Button.component";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/Command/Command.component";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/Popover/Popover.component";
import { cn } from "@/utils/cn.utils";

import { useIconSelector } from "./hooks/useIconSelector.hook";
import { getIconComponent } from "./utils/iconSelector.utils";

export interface IconSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  color: string;
}

export function IconSelector({
  value,
  onChange,
  placeholder = "Selecione um ícone...",
  className,
  disabled = false,
  color
}: IconSelectorProps) {
  const {
    open,
    setOpen,
    search,
    setSearch,
    filteredIcons,
    SelectedIcon,
    handleSelect,
    handleClear
  } = useIconSelector({ value, onChange });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between font-normal",
            !value && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <div className="flex items-center gap-2">
            {SelectedIcon ? (
              <>
                <div
                  style={{ backgroundColor: color }}
                  className="rounded-full p-1"
                >
                  <SelectedIcon className="text-secondary h-4 w-4" />
                </div>
                <span>{value}</span>
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                <span>{placeholder}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1">
            {value && (
              <span
                className="hover:bg-destructive hover:text-destructive-foreground flex h-4 w-4 items-center justify-center rounded p-0"
                onClick={handleClear}
              >
                <X />
              </span>
            )}
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-180 p-0" align="start">
        <Command>
          <div className="flex items-center border-b px-3">
            <CommandInput
              placeholder="Buscar ícones..."
              value={search}
              onValueChange={setSearch}
              className="placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandList className="max-h-[300px] overflow-auto">
            <CommandEmpty>
              <div className="py-6 text-center text-sm">
                <Search className="text-muted-foreground mx-auto mb-2 h-4 w-4" />
                Nenhum ícone encontrado.
              </div>
            </CommandEmpty>
            <CommandGroup>
              <div className="p-2">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-muted-foreground text-xs font-medium">
                    {filteredIcons.length} ícones encontrados
                  </span>
                  {search && (
                    <Badge variant="secondary" className="text-xs">
                      "{search}"
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-8 gap-1">
                  {filteredIcons.map((iconName) => {
                    const IconComponent = getIconComponent(iconName);
                    const isSelected = value === iconName;

                    if (!IconComponent) return null;
                    return (
                      <CommandItem
                        key={iconName}
                        value={iconName}
                        onSelect={() => handleSelect(iconName)}
                        className={cn(
                          "hover:border-primary/20 hover:bg-accent flex h-22 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-transparent p-2 transition-all",
                          isSelected && "border-primary bg-primary/10"
                        )}
                        title={iconName}
                      >
                        <div
                          className="relative mb-1 flex items-center justify-center rounded-full p-2"
                          style={{
                            backgroundColor: color,
                            border: isSelected ? `2px solid white` : "none"
                          }}
                        >
                          <IconComponent className="h-4 w-4 text-black" />
                        </div>
                        <span className="mt-1 w-full truncate text-center text-xs leading-tight">
                          {iconName}
                        </span>
                      </CommandItem>
                    );
                  })}
                </div>
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
