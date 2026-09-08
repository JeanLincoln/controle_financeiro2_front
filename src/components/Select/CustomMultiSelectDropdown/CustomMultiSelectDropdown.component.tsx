import { type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ChevronDownIcon, ChevronUpIcon, X } from "lucide-react";

import { useInfiniteQueryObserver } from "@/hooks/useInfiniteQueryObserver.hook";
import { cn } from "@/utils/cn.utils";

import "./customMultiSelect.custom-styles.css";

import { useCustomMultiSelectDropdown } from "./hooks/useCustomMultiSelectDropdown.hook";

export type MultiSelectOptionProps = {
  id: number;
  name: string;
};

export type MultiSelectDropdownProps = {
  label?: string;
  options: MultiSelectOptionProps[];
  placeholder?: string;
  className?: string;
  bottomButtonCallback?: () => void;
  bottomButtonText?: ReactNode;
  isLoadingOptions?: boolean;
  disabled?: boolean;
  required?: boolean;
  value?: number[];
  onChange: (value: unknown) => void;
  secondaryOnChange?: () => void;
  error?: string;
  infiniteScroll?: {
    fetchNextPage: () => void;
    hasNextPage: boolean;
  };
};

export const CustomMultiSelectDropdown = ({
  label,
  options,
  bottomButtonCallback,
  bottomButtonText = "Ação",
  className,
  placeholder = "Selecione uma opção",
  isLoadingOptions = false,
  disabled = false,
  required = false,
  value,
  error,
  secondaryOnChange,
  onChange,
  infiniteScroll
}: MultiSelectDropdownProps) => {
  const setLastButtonRef = useInfiniteQueryObserver(
    infiniteScroll
      ? {
          fetchNextPage: infiniteScroll.fetchNextPage,
          hasNextPage: infiniteScroll.hasNextPage,
          isLoading: isLoadingOptions
        }
      : undefined
  );

  const {
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
  } = useCustomMultiSelectDropdown({ options });

  const validatedLastButtonRef = (index: number) =>
    index === (filteredOptions?.length || 0) - 1 && infiniteScroll?.hasNextPage
      ? setLastButtonRef
      : null;

  const selectedOptions = handleFindSelectedOptions(value || []);
  const thereAreNoOptions = !isLoadingOptions && !options?.length;
  const isDisabled =
    isLoadingOptions || (!options?.length && !bottomButtonCallback) || disabled;
  const thereAreOptionsSelected =
    !isLoadingOptions && !!selectedOptions?.length;
  const thereAreNoOptionsSelected =
    !isLoadingOptions && !selectedOptions?.length;

  return (
    <div
      ref={dropdownRef}
      className={cn(
        "focus:ring-primary relative flex h-[36px] w-full min-w-[200px] flex-1 cursor-pointer flex-col items-center justify-center rounded-sm focus:ring-2 focus:outline-none",
        className
      )}
    >
      {label && (
        <div className="bg-background absolute top-[-13px] left-[8px] z-10 flex w-fit items-center justify-start px-1">
          <span>
            {label} {required && <span className="text-destructive">*</span>}
          </span>
        </div>
      )}
      <button
        type="button"
        className={cn(
          "bg-secondary border-input custom-scrollbar relative flex h-full w-full cursor-pointer items-center justify-start gap-[8px] overflow-x-auto overflow-y-hidden rounded-md border p-[8px]",
          !!error && "border-destructive border"
        )}
        disabled={isLoadingOptions || !options.length || disabled}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isLoadingOptions && (
          <div className="loading-indicator">
            <span />
          </div>
        )}
        {thereAreNoOptions && !bottomButtonCallback && (
          <span className="text-sm">Não há opções disponíveis!</span>
        )}
        {thereAreNoOptions && bottomButtonCallback && (
          <span className="text-sm">Não há opções disponíveis! Crie uma!</span>
        )}
        {thereAreOptionsSelected &&
          selectedOptions.map((selectedOption) => (
            <SelectedItems
              key={selectedOption.id}
              selectedOption={selectedOption}
              handleRemoveSelectedOption={() =>
                handleRemoveSelectedOption(
                  selectedOption,
                  value || [],
                  onChange
                )
              }
            />
          ))}
        {thereAreNoOptionsSelected && !!options?.length && (
          <span className="overflow-hidden text-sm text-ellipsis whitespace-nowrap">
            {placeholder}
          </span>
        )}
        {!isDisabled && thereAreNoOptionsSelected && (
          <>
            {isOpen ? (
              <span className="open-status-icon">
                <ChevronUpIcon size={16} />
              </span>
            ) : (
              <span className="open-status-icon">
                <ChevronDownIcon size={16} />
              </span>
            )}
          </>
        )}
      </button>
      {createPortal(
        <div
          ref={containerRef}
          className="reference-container pointer-events-auto scroll-auto"
          style={{
            top: dropdownPositions?.top,
            left: dropdownPositions?.left,
            width: dropdownPositions?.width
          }}
        >
          <div
            className={cn(
              "bg-popover border-border custom-scrollbar flex flex-col gap-2 overflow-x-hidden overflow-y-auto rounded-md border px-1 shadow-lg transition-all duration-200 ease-in-out",
              isOpen ? "content-container-open" : "content-container-closed"
            )}
            onWheel={(e) => {
              e.stopPropagation();
            }}
          >
            <button
              type="button"
              onClick={() => handleClearSelection(onChange)}
              className="border-border hover:bg-accent mx-auto mt-2 w-[95%] cursor-pointer rounded-md border bg-transparent px-0 py-1 text-sm transition-colors duration-200"
            >
              Limpar seleção
            </button>
            <div className="relative">
              <input
                placeholder="Procure..."
                type="text"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                className="bg-accent sticky top-0 w-full rounded-md border-0 p-2 text-sm outline-0"
              />
              <button
                type="button"
                onClick={() => {
                  setSearchInput("");
                }}
                className="clear-search-button bg-primary absolute top-1/2 right-[2%] flex h-4 w-4 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-0 p-1 transition-all duration-200"
              >
                <X size={12} className="text-secondary" />
              </button>
            </div>
            <div className="flex flex-col">
              {filteredOptions?.map((option, index) => (
                <button
                  ref={validatedLastButtonRef(index)}
                  type="button"
                  key={option.id}
                  value={option.id}
                  title={option.name}
                  onClick={() => {
                    if (secondaryOnChange) {
                      secondaryOnChange();
                    }
                    handleToggleOption(option, value || [], onChange);
                  }}
                  className="hover:bg-accent flex h-[35px] w-full cursor-pointer items-center justify-between rounded-md border-0 bg-transparent p-2 text-left transition-all duration-200"
                >
                  <span className="overflow-hidden text-sm text-ellipsis whitespace-nowrap">
                    {option.name}
                  </span>
                  <span>
                    {value?.some(
                      (selectedOption: number) => selectedOption === option.id
                    ) && "✓"}
                  </span>
                </button>
              ))}
            </div>
            {bottomButtonCallback && (
              <button
                type="button"
                onClick={() => {
                  bottomButtonCallback();
                  setIsOpen(false);
                }}
                disabled={!isOpen}
                className={cn(
                  "border-border hover:bg-muted absolute -bottom-[30px] left-0 mx-auto mt-2 w-full cursor-pointer rounded-md border bg-transparent px-0 py-1 text-sm transition-colors duration-200",
                  isOpen
                    ? "pointer-events-auto block"
                    : "pointer-events-none hidden"
                )}
              >
                {bottomButtonText}
              </button>
            )}
          </div>
        </div>,
        document.body
      )}
      <div className="text-destructive absolute -bottom-5 left-0 mb-1 text-xs">
        {error && <span>{error}</span>}
      </div>
    </div>
  );
};

type SelectedItemsProps = {
  selectedOption: MultiSelectOptionProps;
  handleRemoveSelectedOption: () => void;
};

const SelectedItems = ({
  selectedOption,
  handleRemoveSelectedOption
}: SelectedItemsProps) => (
  <div className="selected-item bg-accent/80 relative w-fit rounded-sm py-1 pr-[10px] pl-[35px]">
    <div
      className="selected-item-remove-button bg-primary absolute top-1/2 left-[5%] flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-0 p-1 transition-all duration-200"
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        handleRemoveSelectedOption();
      }}
    >
      <X size={10} className="text-primary-foreground" />
    </div>
    <span
      key={selectedOption.id}
      title={selectedOption.name}
      className="inline-block text-start align-middle text-sm whitespace-nowrap"
    >
      {selectedOption.name}
    </span>
  </div>
);
