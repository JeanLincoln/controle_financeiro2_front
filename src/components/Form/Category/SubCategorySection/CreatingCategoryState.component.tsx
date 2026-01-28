import { ArrowLeftCircleIcon } from "lucide-react";

export function CreatingCategoryState() {
  return (
    <div className="text-muted-foreground my-auto flex h-full flex-1 flex-col items-center justify-center gap-2">
      <ArrowLeftCircleIcon className="h-18 w-18" />
      Crie a categoria primeiro para adicionar sub-categorias.
    </div>
  );
}
