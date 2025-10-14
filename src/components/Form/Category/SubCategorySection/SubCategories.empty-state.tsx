import { ArrowUpCircle } from "lucide-react";

export function SubCategoriesEmptyState() {
  return (
    <div className="text-muted-foreground my-auto flex h-full flex-1 items-center justify-end gap-4">
      Clique aqui para criar uma nova sub-categoria!
      <ArrowUpCircle className="h-12 w-12" />
    </div>
  );
}
