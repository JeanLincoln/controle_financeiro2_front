import {
  Building2,
  FolderOpen,
  Tags,
  CreditCard,
  ChartNoAxesCombined
} from "lucide-react";

export const asideNavigationItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: ChartNoAxesCombined
  },
  {
    name: "Origin",
    href: "/origin",
    icon: Building2
  },
  {
    name: "Category",
    href: "/category",
    icon: FolderOpen
  },
  {
    name: "Sub Category",
    href: "/sub-category",
    icon: Tags
  },
  {
    name: "Transaction",
    href: "/transaction",
    icon: CreditCard
  }
];
