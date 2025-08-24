import { ArrowUpCircle } from "lucide-react";

export function SubCategoriesEmptyState() {
  return (
    <div className="flex items-center justify-end gap-4 flex-1 text-muted-foreground my-auto h-full">
      Clique aqui para criar uma nova sub-categoria!
      <ArrowUpCircle className="h-12 w-12 " />
    </div>
  );
}
