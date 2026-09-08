import type { TransactionFindAllResponse } from "@/store/services/transaction/transactionService.types";

import { TransactionCard } from "./TransactionCard.component";
import { TransactionsListSectionSkeleton } from "./TransactionsListSectionSkeleton.skeleton";

type TransactionsListSectionProps = {
  transactions?: TransactionFindAllResponse["data"];
  loading: boolean;
  onDelete: (transactionId: number) => void;
};

export function TransactionsListSection({
  transactions,
  loading,
  onDelete
}: TransactionsListSectionProps) {
  const dataIsLoaded = !loading && transactions && transactions.length > 0;
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading && <TransactionsListSectionSkeleton />}
        {dataIsLoaded &&
          transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              onDelete={onDelete}
            />
          ))}
      </div>
    </div>
  );
}
