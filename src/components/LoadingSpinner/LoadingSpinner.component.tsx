import { cn } from "@/utils/cn.utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "pulse" | "dots" | "orbit";
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  variant = "default",
  className
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  if (variant === "pulse") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div className={cn("relative", sizeClasses[size])}>
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
          <div className="absolute inset-0 rounded-full bg-primary/40 animate-pulse"></div>
          <div className="relative rounded-full bg-primary animate-bounce"></div>
        </div>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div
        className={cn("flex items-center justify-center space-x-1", className)}
      >
        <div
          className={cn(
            "rounded-full bg-primary animate-bounce",
            size === "sm" ? "w-1 h-1" : size === "md" ? "w-2 h-2" : "w-3 h-3"
          )}
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className={cn(
            "rounded-full bg-primary animate-bounce",
            size === "sm" ? "w-1 h-1" : size === "md" ? "w-2 h-2" : "w-3 h-3"
          )}
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className={cn(
            "rounded-full bg-primary animate-bounce",
            size === "sm" ? "w-1 h-1" : size === "md" ? "w-2 h-2" : "w-3 h-3"
          )}
          style={{ animationDelay: "300ms" }}
        ></div>
      </div>
    );
  }

  if (variant === "orbit") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div className={cn("relative", sizeClasses[size])}>
          <div className="absolute inset-0 rounded-full border-2 border-primary/20"></div>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin"></div>
          <div
            className="absolute inset-1 rounded-full border border-transparent border-r-primary animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
          ></div>
          <div className="absolute inset-2 rounded-full bg-primary/60 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping"></div>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary animate-spin"></div>
        <div
          className="absolute inset-1 rounded-full border border-transparent border-b-primary/60 animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-primary animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
