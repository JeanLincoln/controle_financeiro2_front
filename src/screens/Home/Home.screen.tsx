import { Building2, CreditCard, FolderOpen, Tags } from "lucide-react";
import { Balance } from "./components/Balance/Balance.component";
import { BalanceChart } from "./components/BalanceChart/BalanceChart.component";
import { RankingCard } from "./components/RankingCard/RankingCard.component";
import { RankingRequests } from "./hooks/rankingRequests.hook";

export default function HomeScreen() {
  const { category, subCategory, origin, transaction } = RankingRequests();

  return (
    <div className="container flex flex-col mx-auto p-6 gap-8">
      {/* <Header /> */}
      <Balance />
      <div className="flex gap-2 flex-wrap justify-between">
        <RankingCard
          name="categorias"
          data={category.categoryData}
          fetchTrigger={category.fetchCategoriesRanking}
          isLoading={category.isLoadingCategory}
          icon={<FolderOpen className="h-5 w-5" />}
        />
        <RankingCard
          name="subcategorias"
          data={subCategory.subCategoryData}
          fetchTrigger={subCategory.fetchSubCategoriesRanking}
          isLoading={subCategory.isLoadingSubCategory}
          icon={<Tags className="h-5 w-5" />}
        />
        <RankingCard
          name="origens"
          data={origin.originData}
          fetchTrigger={origin.fetchOriginsRanking}
          isLoading={origin.isLoadingOrigin}
          icon={<Building2 className="h-5 w-5" />}
        />
        <RankingCard
          name="transações"
          data={transaction.transactionData}
          fetchTrigger={transaction.fetchTransactionsRanking}
          isLoading={transaction.isLoadingTransaction}
          icon={<CreditCard className="h-5 w-5" />}
        />
      </div>
      <BalanceChart />
    </div>
  );
}
