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
          <div className="bg-primary/20 absolute inset-0 animate-ping rounded-full"></div>
          <div className="bg-primary/40 absolute inset-0 animate-pulse rounded-full"></div>
          <div className="bg-primary relative animate-bounce rounded-full"></div>
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
            "bg-primary animate-bounce rounded-full",
            size === "sm" ? "h-1 w-1" : size === "md" ? "h-2 w-2" : "h-3 w-3"
          )}
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className={cn(
            "bg-primary animate-bounce rounded-full",
            size === "sm" ? "h-1 w-1" : size === "md" ? "h-2 w-2" : "h-3 w-3"
          )}
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className={cn(
            "bg-primary animate-bounce rounded-full",
            size === "sm" ? "h-1 w-1" : size === "md" ? "h-2 w-2" : "h-3 w-3"
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
          <div className="border-primary/20 absolute inset-0 rounded-full border-2"></div>
          <div className="border-t-primary absolute inset-0 animate-spin rounded-full border-2 border-transparent"></div>
          <div
            className="border-r-primary absolute inset-1 animate-spin rounded-full border border-transparent"
            style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
          ></div>
          <div className="bg-primary/60 absolute inset-2 animate-pulse rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <div className="border-primary/20 absolute inset-0 animate-ping rounded-full border-2"></div>
        <div className="border-t-primary border-r-primary absolute inset-0 animate-spin rounded-full border-2 border-transparent"></div>
        <div
          className="border-b-primary/60 absolute inset-1 animate-spin rounded-full border border-transparent"
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-primary h-1 w-1 animate-pulse rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
