import * as React from "react";

import { cn } from "@/utils/cn.utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "../Tooltip/Tooltip.component";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

type CardTitleProps = React.ComponentProps<"div"> & {
  withTooltip?: boolean;
};

function CardTitle({
  className,
  children,
  withTooltip = false,
  ...props
}: CardTitleProps) {
  return withTooltip ? (
    <Tooltip>
      <TooltipTrigger className="flex items-start w-fit text-start">
        <div
          data-slot="card-title"
          className={cn("leading-none font-semibold", className)}
          {...props}
        >
          {children}
        </div>
      </TooltipTrigger>
      <TooltipContent className="max-w-70">{children}</TooltipContent>
    </Tooltip>
  ) : (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    >
      {children}
    </div>
  );
}

type CardDescriptionProps = React.ComponentProps<"div"> & {
  withTooltip?: boolean;
};

function CardDescription({
  className,
  children,
  withTooltip = false,
  ...props
}: CardDescriptionProps) {
  return withTooltip ? (
    <Tooltip>
      <TooltipTrigger className="flex items-start w-fit text-start">
        <div
          data-slot="card-description"
          className={cn("text-muted-foreground text-sm", className)}
          {...props}
        >
          {children}
        </div>
      </TooltipTrigger>
      <TooltipContent className="max-w-100">{children}</TooltipContent>
    </Tooltip>
  ) : (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent
};
