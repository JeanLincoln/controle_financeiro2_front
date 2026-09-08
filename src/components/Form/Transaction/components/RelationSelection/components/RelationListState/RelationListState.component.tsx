import type { ReactNode } from "react";
import { RotateCw } from "lucide-react";

import { Button } from "@/components/Button/Button.component";

type RelationListStateProps = {
  icon: ReactNode;
  title: string;
  description: string;
  retryAction?: () => void;
};

export function RelationListState({
  icon,
  title,
  description,
  retryAction
}: RelationListStateProps) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center gap-3 text-center">
      {icon}
      <div className="space-y-1">
        <p className="font-medium">{title}</p>
        <p className="text-muted-foreground max-w-sm text-sm">{description}</p>
      </div>
      {retryAction && (
        <Button type="button" variant="outline" size="sm" onClick={retryAction}>
          <RotateCw className="h-4 w-4" />
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
