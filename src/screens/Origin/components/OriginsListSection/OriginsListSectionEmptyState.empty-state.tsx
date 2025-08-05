import { Building2 } from "lucide-react";
import type { PropsWithChildren } from "react";

export function OriginsListSectionEmptyState({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 flex-wrap w-full gap-4">
      <Building2 size={100} className="text-muted-foreground" />
      {children}
    </div>
  );
}
