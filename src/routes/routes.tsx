import HomeScreen from "@/screens/Home/Home.screen";
import { ProfileScreen } from "@/screens/Profile/Profile.screen";
import TransactionScreen from "@/screens/Transaction/Transaction.screen";
import { TransactionFormScreen } from "@/screens/TransactionForm/TransactionForm.screen";

export const APP_ROUTES = [
  {
    path: "/",
    element: <HomeScreen />
  },
  {
    path: "/profile",
    element: <ProfileScreen />
  },
  {
    path: "/transaction",
    element: <TransactionScreen />
  },
  {
    path: "/transaction/new",
    element: <TransactionFormScreen />
  },
  {
    path: "/transaction/:id/edit",
    element: <TransactionFormScreen />
  }
];
