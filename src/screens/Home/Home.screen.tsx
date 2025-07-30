import { Header } from "./components/Header/Header.component";
import { Balance } from "./components/Balance/Balance.component";
import { BalanceChart } from "./components/BalanceChart/BalanceChart.component";

export default function Home() {
  return (
    <div className="container flex flex-col mx-auto p-6 gap-8">
      <Header />
      <Balance />
      <BalanceChart />
    </div>
  );
}
