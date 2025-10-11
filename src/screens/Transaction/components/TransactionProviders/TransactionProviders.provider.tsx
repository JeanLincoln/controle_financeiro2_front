import { AlertDialog } from "@/components/AlertDialog/AlertDialog.component";
import { Drawer } from "@/components/Drawer/Drawer.component";
import type { PropsWithChildren } from "react";
import { useTransactionDialogVisibility } from "../../hooks/useTransactionAlertDialogVisibility.hook";
import { useTransactionDrawerVisibility } from "../../hooks/useTransactionDrawerVisibility.hook";
import { TransactionAlertDialog } from "./TransactionAlertDialog/TransactionAlertDialog.component";
import { TransactionDrawer } from "./TransactionDrawer/TransactionDrawer.drawer";

export function TransactionProviders({ children }: PropsWithChildren) {
  const { isVisible: drawerIsVisible, onOpenChange: onDrawerOpenChange } =
    useTransactionDrawerVisibility();

  const { isVisible: dialogIsVisible, onOpenChange: onDialogOpenChange } =
    useTransactionDialogVisibility();

  return (
    <AlertDialog open={dialogIsVisible} onOpenChange={onDialogOpenChange}>
      <Drawer open={drawerIsVisible} onOpenChange={onDrawerOpenChange}>
        {children}
        <TransactionDrawer />
        <TransactionAlertDialog />
      </Drawer>
    </AlertDialog>
  );
}
