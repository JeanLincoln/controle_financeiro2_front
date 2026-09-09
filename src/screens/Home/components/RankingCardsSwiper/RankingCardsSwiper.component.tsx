import { Building2, CreditCard, FolderOpen, Tags } from "lucide-react";

import { useCategoryRanking } from "@/store/requests/dashboard/useCategoryRanking.request";
import { useOriginRanking } from "@/store/requests/dashboard/useOriginRanking.request";
import { useSubCategoryRanking } from "@/store/requests/dashboard/useSubCategoryRanking.request";
import { useTransactionRanking } from "@/store/requests/dashboard/useTransactionRanking.request";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Keyboard, Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useRankingFilters } from "../../hooks/useRankingFilters.hook";
import { RankingCard } from "../RankingCard/RankingCard.component";

import "./RankingCardsSwiper.css";

const EIGHT_SECONDS_IN_MS = 8000;
const SPACE_BETWEEN_SLIDES = 16;
const DEFAULT_SLIDES_PER_VIEW = 2.15;
const AUTO_PLAY_CONFIG = {
  delay: EIGHT_SECONDS_IN_MS,
  disableOnInteraction: false,
  pauseOnMouseEnter: true
};
const BREAKPOINTS_CONFIG = {
  640: {
    slidesPerView: 1.5,
    spaceBetween: 16
  },
  768: {
    slidesPerView: 2.3,
    spaceBetween: 16
  }
};

export function RankingCardsSwiper() {
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
    <div className="ranking-swiper mb-4">
      <Swiper
        modules={[Pagination, Mousewheel, Keyboard, Autoplay]}
        spaceBetween={SPACE_BETWEEN_SLIDES}
        slidesPerView={DEFAULT_SLIDES_PER_VIEW}
        autoplay={AUTO_PLAY_CONFIG}
        breakpoints={BREAKPOINTS_CONFIG}
        pagination={{ clickable: true }}
        mousewheel
        keyboard
        loop
        className="pb-10"
      >
        <SwiperSlide>
          <RankingCard
            name="categorias"
            data={category.categoryData}
            isLoading={category.isLoadingCategory}
            icon={<FolderOpen className="h-5 w-5" />}
          />
        </SwiperSlide>
        <SwiperSlide>
          <RankingCard
            name="subcategorias"
            data={subCategory.subCategoryData}
            isLoading={subCategory.isLoadingSubCategory}
            icon={<Tags className="h-5 w-5" />}
          />
        </SwiperSlide>
        <SwiperSlide>
          <RankingCard
            name="origens"
            data={origin.originData}
            isLoading={origin.isLoadingOrigin}
            icon={<Building2 className="h-5 w-5" />}
          />
        </SwiperSlide>
        <SwiperSlide>
          <RankingCard
            name="transações"
            data={transaction.transactionData}
            isLoading={transaction.isLoadingTransaction}
            icon={<CreditCard className="h-5 w-5" />}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
