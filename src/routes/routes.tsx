import CategoryScreen from "@/screens/Category/Category.screen";
import HomeScreen from "@/screens/Home/Home.screen";
import OriginScreen from "@/screens/Origin/Origin.screen";
import SubCategoryScreen from "@/screens/SubCategory/SubCategory.screen";
import TransactionScreen from "@/screens/Transaction/Transaction.screen";

export const APP_ROUTES = [
  {
    path: "/",
    element: <HomeScreen />
  },
  {
    path: "/origin",
    element: <OriginScreen />
  },
  {
    path: "/category",
    element: <CategoryScreen />
  },
  {
    path: "/sub-category",
    element: <SubCategoryScreen />
  },
  {
    path: "/transaction",
    element: <TransactionScreen />
  }
];
