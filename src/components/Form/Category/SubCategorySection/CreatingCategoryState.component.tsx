import { ArrowLeftCircleIcon } from "lucide-react";

export function CreatingCategoryState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 flex-1 text-muted-foreground my-auto h-full">
      <ArrowLeftCircleIcon className="h-18 w-18 " />
      Crie a categoria primeiro para adicionar sub-categorias.
    </div>
  );
}
