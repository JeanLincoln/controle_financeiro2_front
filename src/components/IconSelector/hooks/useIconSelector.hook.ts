import { useMemo, useState } from "react";
import { iconNames } from "../constants/iconSelector.constants";
import { getIconComponent } from "../utils/iconSelector.utils";

type UseIconSelectorProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export function useIconSelector({ value, onChange }: UseIconSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredIcons = useMemo(() => {
    if (!search) return iconNames;
    return iconNames.filter((name) =>
      name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const SelectedIcon = value ? getIconComponent(value) : null;

  const handleSelect = (iconName: string) => {
    onChange?.(iconName);
    setOpen(false);
    setSearch("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.("");
    setOpen(false);
  };

  return {
    open,
    setOpen,
    search,
    setSearch,
    filteredIcons,
    SelectedIcon,
    handleSelect,
    handleClear
  };
}
