import { FolderOpen } from "lucide-react";

type CategoriesListSectionEmptyStateProps = {
  nameSearch?: string;
};

export function CategoriesListSectionEmptyState({
  nameSearch
}: CategoriesListSectionEmptyStateProps) {
  return (
    <div className="flex w-full flex-1 flex-col flex-wrap items-center justify-center gap-4">
      <FolderOpen size={100} className="text-muted-foreground" />
      <span className="text-muted-foreground">
        {nameSearch
          ? "Não foi encontrada nenhuma categoria com este nome"
          : "Não há categorias cadastradas, crie uma!"}
      </span>
    </div>
  );
}
