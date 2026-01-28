import { Building2 } from "lucide-react";

type TransactionsListSectionEmptyStateProps = {
  nameSearch?: string;
};

export function TransactionsListSectionEmptyState({
  nameSearch
}: TransactionsListSectionEmptyStateProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
      <div className="bg-muted/50 mb-4 rounded-full p-6">
        <Building2 className="text-muted-foreground h-12 w-12" />
      </div>
      <h3 className="mb-2 text-lg font-semibold">
        {nameSearch ? "Nenhuma transação encontrada" : "Nenhuma transação"}
      </h3>
      <p className="text-muted-foreground mb-4 max-w-sm text-sm">
        {nameSearch
          ? "Não encontramos transações com os filtros aplicados. Tente ajustar sua busca."
          : "Você ainda não possui transações cadastradas. Clique no botão acima para criar sua primeira transação."}
      </p>
    </div>
  );
}
