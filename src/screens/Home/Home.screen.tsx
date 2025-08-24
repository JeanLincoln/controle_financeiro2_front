import { useCategoryRanking } from "@/store/requests/dashboard/useCategoryRanking.request";
import { useOriginRanking } from "@/store/requests/dashboard/useOriginRanking.request";
import { useSubCategoryRanking } from "@/store/requests/dashboard/useSubCategoryRanking.request";
import { useTransactionRanking } from "@/store/requests/dashboard/useTransactionRanking.request";
import { Building2, CreditCard, FolderOpen, Tags } from "lucide-react";
import { Balance } from "./components/Balance/Balance.component";
import { BalanceChart } from "./components/BalanceChart/BalanceChart.component";
import { RankingCard } from "./components/RankingCard/RankingCard.component";
import { useRankingFilters } from "./hooks/useRankingFilters.hook";

export default function HomeScreen() {
  const {
    categoryRankingType,
    originRankingType,
    subCategoryRankingType,
    transactionRankingType
  } = useRankingFilters();

  const category = useCategoryRanking({
    type: categoryRankingType
  });
  const subCategory = useSubCategoryRanking({
    type: subCategoryRankingType
  });
  const origin = useOriginRanking({
    type: originRankingType
  });
  const transaction = useTransactionRanking({
    type: transactionRankingType
  });

  return (
    <div className="container flex flex-col mx-auto p-6 gap-8">
      <Balance />
      <div className="flex gap-2 flex-wrap justify-between">
        <RankingCard
          name="categorias"
          data={category.categoryData}
          isLoading={category.isLoadingCategory}
          icon={<FolderOpen className="h-5 w-5" />}
        />
        <RankingCard
          name="subcategorias"
          data={subCategory.subCategoryData}
          isLoading={subCategory.isLoadingSubCategory}
          icon={<Tags className="h-5 w-5" />}
        />
        <RankingCard
          name="origens"
          data={origin.originData}
          isLoading={origin.isLoadingOrigin}
          icon={<Building2 className="h-5 w-5" />}
        />
        <RankingCard
          name="transações"
          data={transaction.transactionData}
          isLoading={transaction.isLoadingTransaction}
          icon={<CreditCard className="h-5 w-5" />}
        />
      </div>
      <BalanceChart />
    </div>
  );
}
