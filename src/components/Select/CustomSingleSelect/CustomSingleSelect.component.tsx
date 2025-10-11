import { useInfiniteQueryObserver } from "@/hooks/useInfiniteQueryObserver.hook";
import { cn } from "@/utils/cn.utils";
import { ChevronDownIcon, ChevronUpIcon, X } from "lucide-react";
import { createPortal } from "react-dom";
import "./customSelect.custom-styles.css";
import { useCustomSingleSelect } from "./hooks/useCustomSingleSelect.hook";

export type SingleSelectOptionProps = {
  id: number;
  name: string;
};

export type CustomSingleSelectProps = {
  label?: string;
  options: SingleSelectOptionProps[];
  placeholder?: string;
  className?: string;
  bottomButtonCallback?: () => void;
  isLoadingOptions?: boolean;
  disabled?: boolean;
  required?: boolean;
  value?: number;
  onChange: (value: unknown) => void;
  secondaryOnChange?: () => void;
  error?: string;
  infiniteScroll?: {
    fetchNextPage: () => void;
    hasNextPage: boolean;
  };
};

export const CustomSingleSelect = ({
  label,
  options,
  bottomButtonCallback,
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
}: CustomSingleSelectProps) => {
  const infiniteProps = useInfiniteQueryObserver(
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
    filteredOptions,
    handleToggleOption,
    dropdownRef,
    handleClearSelection,
    containerRef,
    dropdownPositions,
    handleFindSelectedOption
  } = useCustomSingleSelect({ options });

  const validatedLastButtonRef = (index: number) =>
    index === filteredOptions.length - 1 && infiniteScroll?.hasNextPage
      ? infiniteProps?.lastElementRef
      : null;

  return (
    <div
      ref={dropdownRef}
      className={cn(
        "w-full h-[36px] relative flex flex-1 flex-col items-center justify-center  rounded-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary",
        className
      )}
    >
      {label && (
        <div className="w-full absolute top-[-13px] left-[8px] z-10 flex items-center justify-start bg-background px-1">
          <span>
            {label} {required && <span className="text-destructive">*</span>}
          </span>
        </div>
      )}
      <button
        type="button"
        className={cn(
          "relative w-full h-full flex items-center justify-start gap-[8px] p-[8px] bg-secondary rounded-md border border-input cursor-pointer overflow-y-hidden overflow-x-auto custom-scrollbar",
          !!error && "border border-destructive"
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
        {!isLoadingOptions && !options.length && (
          <span>Não há opções disponíveis!</span>
        )}
        {!isLoadingOptions && !!options.length && (
          <span className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
            {handleFindSelectedOption(value)?.name || placeholder}
          </span>
        )}
        {!isLoadingOptions && !!options.length && !disabled && (
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
          className="reference-container"
          style={{
            top: dropdownPositions?.top,
            left: dropdownPositions?.left,
            width: dropdownPositions?.width
          }}
        >
          <div
            className={cn(
              "flex flex-col gap-2 transition-all duration-200 ease-in-out bg-popover border border-border rounded-md shadow-lg overflow-y-auto overflow-x-hidden custom-scrollbar px-1",
              isOpen && !isLoadingOptions
                ? "content-container-open"
                : "content-container-closed"
            )}
          >
            <button
              type="button"
              onClick={() => handleClearSelection(onChange)}
              className="w-[95%] mx-auto mt-2 bg-transparent border border-border rounded-md py-1 px-0 cursor-pointer hover:bg-accent transition-colors duration-200 text-sm"
            >
              Limpar seleção
            </button>
            <div className="relative">
              <input
                placeholder="Procure..."
                type="text"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                className="sticky top-0 w-full p-2 bg-accent border-0 text-sm outline-0 rounded-md"
              />
              <button
                type="button"
                onClick={() => {
                  setSearchInput("");
                }}
                className="clear-search-button absolute top-1/2 right-[2%] -translate-y-1/2 w-4 h-4 p-1 flex items-center justify-center bg-primary rounded-full border-0 cursor-pointer transition-all duration-200"
              >
                <X size={12} className="text-secondary" />
              </button>
            </div>
            <div className="flex flex-col">
              {filteredOptions.map((option, index) => (
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

                    handleToggleOption(option, onChange, value);
                  }}
                  className="w-full h-[35px] flex items-center justify-between p-2 bg-transparent border-0 cursor-pointer transition-all duration-200 text-left hover:bg-accent rounded-md"
                >
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
                    {option.name}
                  </span>
                  <span>{value === option.id && "✓"}</span>
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
                  "absolute -bottom-[30px] left-0 w-full mx-auto mt-2 bg-transparent border border-border rounded-md py-1 px-0 cursor-pointer hover:bg-muted transition-colors duration-200 text-sm",
                  !isOpen ? "hidden pointer-events-none" : "block"
                )}
              >
                Ação
              </button>
            )}
          </div>
        </div>,
        document.body
      )}
      <div className="absolute -bottom-5 left-0 text-destructive text-xs mb-1">
        {error && <span>{error}</span>}
      </div>
    </div>
  );
};
