import { useNavigate, useParams } from "react-router";
import { ArrowLeft, ReceiptText } from "lucide-react";

import { Button } from "@/components/Button/Button.component";
import { TransactionForm } from "@/components/Form/Transaction/Transaction.form";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner.component";
import { useFindTransactionById } from "@/store/requests/transaction/useFindTransactionById.request";

type TransactionFormScreenParams = {
  [key: string]: string | undefined;
  id?: string;
};

export function TransactionFormScreen() {
  const navigate = useNavigate();
  const { id } = useParams<TransactionFormScreenParams>();
  const { transaction, isLoading } = useFindTransactionById({ id });
  const isEditing = Boolean(id);
  const pageTitle = isEditing ? "Editar transação" : "Nova transação";
  const pageDescription = isEditing
    ? "Atualize os dados e a organização deste lançamento."
    : "Registre um lançamento e mantenha sua vida financeira organizada.";

  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto max-w-7xl px-4 py-6 pb-12 md:px-6">
        <div className="mb-8 flex flex-col gap-5 border-b pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Voltar para transações"
              className="shrink-0"
              onClick={() => navigate("/transaction")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <div className="text-primary mb-2 flex items-center gap-2">
                <ReceiptText className="h-5 w-5" />
                <span className="text-sm font-medium">Transações</span>
              </div>
              <h1 className="text-foreground text-3xl font-bold tracking-tight">
                {pageTitle}
              </h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                {pageDescription}
              </p>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex h-96 items-center justify-center">
            <LoadingSpinner variant="orbit" size="lg" />
          </div>
        )}
        {!isLoading && (
          <TransactionForm
            transaction={transaction}
            onSuccess={() => navigate("/transaction")}
          />
        )}
      </main>
    </div>
  );
}
