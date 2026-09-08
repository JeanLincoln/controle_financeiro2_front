import { useState } from "react";

import { AlertDialog } from "@/components/AlertDialog/AlertDialog.component";
import { StandardPagination } from "@/components/Pagination/Pagination.component";

import { FiltersSection } from "./components/FiltersSection/FiltersSection.component";
import { HeaderSection } from "./components/Header/HeaderSection.component";
import { TransactionDeleteDialog } from "./components/TransactionDeleteDialog/TransactionDeleteDialog.component";
import { TransactionsListSection } from "./components/TransactionsListSection/TransactionsListSection.component";
import { TransactionsListSectionEmptyState } from "./components/TransactionsListSection/TransactionsListSectionEmptyState.empty-state";
import { useTransactionScreen } from "./hooks/useTransactionScreen.hook";

export default function TransactionScreen() {
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    number | null
  >(null);
  const { form, dataIsLoading, dataIsEmpty, transactions, nameSearch } =
    useTransactionScreen();

  return (
    <AlertDialog
      open={selectedTransactionId !== null}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setSelectedTransactionId(null);
        }
      }}
    >
      <div className="bg-background flex min-h-screen flex-col">
        <div className="container mx-auto flex flex-1 flex-col space-y-2 p-4 pb-12 md:p-6">
          <HeaderSection />
          <FiltersSection form={form} />

          {dataIsEmpty && (
            <TransactionsListSectionEmptyState nameSearch={nameSearch} />
          )}
          {!dataIsEmpty && (
            <div className="flex flex-1 flex-col space-y-4">
              <TransactionsListSection
                loading={dataIsLoading}
                transactions={transactions?.data}
                onDelete={setSelectedTransactionId}
              />
              <div className="mt-auto flex justify-center">
                <StandardPagination
                  paginationProps={transactions?.pagination}
                  onChangePage={(page: number) => form.setValue("page", page)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <TransactionDeleteDialog
        transactionId={selectedTransactionId}
        onClose={() => setSelectedTransactionId(null)}
      />
    </AlertDialog>
  );
}
