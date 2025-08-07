import { AlertDialog } from "@/components/AlertDialog/AlertDialog.component";
import { Drawer } from "@/components/Drawer/Drawer.component";
import type { PropsWithChildren } from "react";
import { useOriginDialogVisibility } from "../../hooks/useOriginAlertDialogVisibility.hook";
import { useOriginDrawerVisibility } from "../../hooks/useOriginDrawerVisibility.hook";

export function OriginProviders({ children }: PropsWithChildren) {
  const { isVisible: drawerIsVisible, onOpenChange: onDrawerOpenChange } =
    useOriginDrawerVisibility();

  const { isVisible: dialogIsVisible, onOpenChange: onDialogOpenChange } =
    useOriginDialogVisibility();

  return (
    <AlertDialog open={dialogIsVisible} onOpenChange={onDialogOpenChange}>
      <Drawer open={drawerIsVisible} onOpenChange={onDrawerOpenChange}>
        {children}
      </Drawer>
    </AlertDialog>
  );
}
