import { Building2 } from "lucide-react";

type TransactionsListSectionEmptyStateProps = {
  nameSearch?: string;
};

export function TransactionsListSectionEmptyState({
  nameSearch
}: TransactionsListSectionEmptyStateProps) {
  return (
    <div className="flex w-full flex-1 flex-col flex-wrap items-center justify-center gap-4">
      <Building2 size={100} className="text-muted-foreground" />
      <span className="text-muted-foreground">
        {nameSearch
          ? "Não foi encontrada nenhuma origem com este nome"
          : "Não há origens cadastradas, crie uma!"}
      </span>
    </div>
  );
}
