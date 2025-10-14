import { useCallback, useEffect, useRef, useState } from "react";

import type { SingleSelectOptionProps } from "../CustomSingleSelect.component";

type UseCustomSingleSelect = {
  options: SingleSelectOptionProps[];
};

type DropdownPosition = {
  top: number;
  left: number;
  width: number;
};

const EMPTY_STATE = undefined;

export const useCustomSingleSelect = ({ options }: UseCustomSingleSelect) => {
  const [dropdownPositions, setDropdownPositions] = useState<
    DropdownPosition | undefined
  >(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = searchInput
    ? options.filter((option) =>
        option.name.toLowerCase().includes(searchInput.toLowerCase())
      )
    : options;

  const handleClearSelection = useCallback(
    (onChange: (value: unknown) => void) => onChange(EMPTY_STATE),
    []
  );

  const handleToggleOption = useCallback(
    (
      option: SingleSelectOptionProps,
      onChange: (value: unknown) => void,
      storedValue?: SingleSelectOptionProps["id"]
    ) => {
      const isSelected = storedValue === option.id;

      onChange(isSelected ? EMPTY_STATE : option.id);
    },
    []
  );

  const handleFindSelectedOption = useCallback(
    (value?: number) => options.find((option) => option.id === value),
    [options]
  );

  const handleCalculateDropdownPosition = useCallback(() => {
    if (!dropdownRef.current) return;

    const topCompensation = 22;
    const rect = dropdownRef.current.getBoundingClientRect();

    const top = rect.top + rect.height / 2 + topCompensation + window.scrollY;
    const left = rect.left + window.scrollX;
    const width = rect.width;
    setDropdownPositions({ top, left, width });
  }, []);

  useEffect(() => {
    if (isOpen) {
      handleCalculateDropdownPosition();
    }
  }, [isOpen, handleCalculateDropdownPosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    isOpen,
    setIsOpen,
    searchInput,
    setSearchInput,
    filteredOptions,
    handleToggleOption,
    dropdownRef,
    containerRef,
    handleClearSelection,
    dropdownPositions,
    handleFindSelectedOption
  };
};
