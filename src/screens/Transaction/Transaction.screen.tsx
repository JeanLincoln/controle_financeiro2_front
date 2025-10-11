import { StandardPagination } from "@/components/Pagination/Pagination.component";
import { FiltersSection } from "./components/FiltersSection/FiltersSection.component";
import { HeaderSection } from "./components/Header/HeaderSection.component";
import { TransactionProviders } from "./components/TransactionProviders/TransactionProviders.provider";
import { TransactionsListSection } from "./components/TransactionsListSection/TransactionsListSection.component";
import { TransactionsListSectionEmptyState } from "./components/TransactionsListSection/TransactionsListSectionEmptyState.empty-state";
import { useTransactionScreen } from "./hooks/useTransactionScreen.hook";

export default function TransactionScreen() {
  const { form, dataIsLoading, dataIsEmpty, transactions, nameSearch } =
    useTransactionScreen();

  return (
    <TransactionProviders>
      <div className="container flex flex-col min-h-screen gap-4 p-6 mx-auto">
        <HeaderSection />
        <FiltersSection form={form} />
        {dataIsEmpty && (
          <TransactionsListSectionEmptyState nameSearch={nameSearch} />
        )}
        {!dataIsEmpty && (
          <>
            <TransactionsListSection
              loading={dataIsLoading}
              transactions={transactions?.data}
            />
            <StandardPagination
              paginationProps={transactions?.pagination}
              onChangePage={(page: number) => form.setValue("page", page)}
            />
          </>
        )}
      </div>
    </TransactionProviders>
  );
}
