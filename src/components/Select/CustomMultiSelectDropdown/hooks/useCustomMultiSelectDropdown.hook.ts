import { useCallback, useEffect, useRef, useState } from "react";
import type { MultiSelectOptionProps } from "../CustomMultiSelectDropdown.component";

type UseCustomMultiSelectDropdownProps = {
  options?: MultiSelectOptionProps[];
};

type DropdownPosition = {
  top: number;
  left: number;
  width: number;
};

const EMPTY_STATE: MultiSelectOptionProps[] = [];

export const useCustomMultiSelectDropdown = ({
  options
}: UseCustomMultiSelectDropdownProps) => {
  const [dropdownPositions, setDropdownPositions] = useState<
    DropdownPosition | undefined
  >(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = searchInput
    ? options?.filter((option) =>
        option.name.toLowerCase().includes(searchInput.toLowerCase())
      )
    : options;

  const handleClearSelection = useCallback(
    (onChange: (value: unknown) => void) => onChange(EMPTY_STATE),
    []
  );

  const handleRemoveSelectedOption = useCallback(
    (
      selectedOption: MultiSelectOptionProps,
      storedValues: number[],
      onChange: (value: unknown) => void
    ) => {
      const newValue = storedValues.filter(
        (storedOption: number) => storedOption !== selectedOption.id
      );
      onChange(newValue);
    },
    []
  );

  const handleToggleOption = useCallback(
    (
      option: MultiSelectOptionProps,
      storedValues: number[],
      onChange: (value: unknown) => void
    ) => {
      const isSelected = storedValues.some(
        (storedOption: number) => storedOption === option.id
      );
      const newValue = isSelected
        ? storedValues.filter(
            (storedOption: number) => storedOption !== option.id
          )
        : [...storedValues, option.id];
      onChange(newValue);
    },
    []
  );

  const handleFindSelectedOptions = useCallback(
    (values: number[]) => {
      return options?.filter((option) => values?.includes(option.id));
    },
    [options]
  );

  const handleCalculateDropdownPosition = useCallback(() => {
    if (!dropdownRef.current) return;

    const topCompensation = 30;
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
    dropdownRef,
    containerRef,
    filteredOptions,
    handleClearSelection,
    handleRemoveSelectedOption,
    handleToggleOption,
    dropdownPositions,
    handleFindSelectedOptions
  };
};
