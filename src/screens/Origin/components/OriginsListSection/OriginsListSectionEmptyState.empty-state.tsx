import { Building2 } from "lucide-react";

type OriginsListSectionEmptyStateProps = {
  nameSearch?: string;
};

export function OriginsListSectionEmptyState({
  nameSearch
}: OriginsListSectionEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 flex-wrap w-full gap-4">
      <Building2 size={100} className="text-muted-foreground" />
      <span className="text-muted-foreground">
        {nameSearch
          ? "Não foi encontrada nenhuma origem com este nome"
          : "Não há origens cadastradas, crie uma!"}
      </span>
    </div>
  );
}
