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
import { ChevronDown, Search, X } from "lucide-react";
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
                  className="p-1 rounded-full"
                >
                  <SelectedIcon className="w-4 h-4 text-secondary" />
                </div>
                <span>{value}</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>{placeholder}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1">
            {value && (
              <span
                className="flex items-center justify-center w-4 h-4 p-0 hover:bg-destructive hover:text-destructive-foreground rounded"
                onClick={handleClear}
              >
                <X />
              </span>
            )}
            <ChevronDown className="w-4 h-4 opacity-50 shrink-0" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 max-w-180" align="start">
        <Command>
          <div className="flex items-center px-3 border-b">
            <CommandInput
              placeholder="Buscar ícones..."
              value={search}
              onValueChange={setSearch}
              className="flex w-full h-10 py-3 text-sm bg-transparent rounded-md outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandList className="max-h-[300px] overflow-auto">
            <CommandEmpty>
              <div className="py-6 text-sm text-center">
                <Search className="w-4 h-4 mx-auto mb-2 text-muted-foreground" />
                Nenhum ícone encontrado.
              </div>
            </CommandEmpty>
            <CommandGroup>
              <div className="p-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground">
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
                          " flex-col flex  items-center justify-center p-2 h-22 cursor-pointer rounded-md border-2 border-transparent transition-all hover:border-primary/20 hover:bg-accent",
                          isSelected && "border-primary bg-primary/10"
                        )}
                        title={iconName}
                      >
                        <div
                          className="relative flex items-center justify-center p-2 mb-1 rounded-full"
                          style={{
                            backgroundColor: color,
                            border: isSelected ? `2px solid white` : "none"
                          }}
                        >
                          <IconComponent className="w-4 h-4 text-black" />
                        </div>
                        <span className="w-full mt-1 text-xs leading-tight text-center truncate ">
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
