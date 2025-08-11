import { AlertDialog } from "@/components/AlertDialog/AlertDialog.component";
import { Drawer } from "@/components/Drawer/Drawer.component";
import type { PropsWithChildren } from "react";
import { useCategoryDialogVisibility } from "../../hooks/useCategoryAlertDialogVisibility.hook";
import { useCategoryDrawerVisibility } from "../../hooks/useCategoryDrawerVisibility.hook";
import { CategoryAlertDialog } from "./CategoryAlertDialog/CategoryAlertDialog.component";
import { CategoryDrawer } from "./CategoryDrawer/CategoryDrawer.drawer";

export function CategoryProviders({ children }: PropsWithChildren) {
  const { isVisible: drawerIsVisible, onOpenChange: onDrawerOpenChange } =
    useCategoryDrawerVisibility();

  const { isVisible: dialogIsVisible, onOpenChange: onDialogOpenChange } =
    useCategoryDialogVisibility();

  return (
    <AlertDialog open={dialogIsVisible} onOpenChange={onDialogOpenChange}>
      <Drawer open={drawerIsVisible} onOpenChange={onDrawerOpenChange}>
        {children}
        <CategoryDrawer />
        <CategoryAlertDialog />
      </Drawer>
    </AlertDialog>
  );
}
