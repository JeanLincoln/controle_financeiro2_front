import * as React from "react";

import { Input } from "@/components/Input/Input.component";
import { cn } from "@/utils/cn.utils";
import { formatToBRLInput } from "@/utils/parseBRLCurrency.utils";

export interface CurrencyInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  value?: number;
  onChange?: (value: number) => void;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [cents, setCents] = React.useState<number>(
      Math.round((value || 0) * 100)
    );

    const displayValue = formatToBRLInput(cents / 100);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        e.preventDefault();

        const newCents = Math.floor(cents / 10);
        setCents(newCents);
        onChange?.(newCents / 100);
        return;
      }

      if (e.key >= "0" && e.key <= "9") {
        e.preventDefault();
        const digit = parseInt(e.key);
        const newCents = cents * 10 + digit;
        setCents(newCents);
        onChange?.(newCents / 100);
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.setSelectionRange(e.target.value.length, e.target.value.length);
    };

    React.useEffect(() => {
      if (value !== undefined) {
        setCents(Math.round(value * 100));
      }
    }, [value]);

    return (
      <Input
        ref={ref}
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={() => {}}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        className={cn("text-left", className)}
        {...props}
      />
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };
