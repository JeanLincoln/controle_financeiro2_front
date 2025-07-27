import * as React from "react";

import { cn } from "@/utils/cn";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
}

function Input({ className, type, icon, ...props }: InputProps) {
  return (
    <div className="relative">
      <input
        autoComplete="off"
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      {icon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 bg-card cursor-pointer rounded-full p-1 w-6 h-6 flex items-center justify-center">
          {icon}
        </div>
      )}
    </div>
  );
}

export { Input };
