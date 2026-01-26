import { useEffect } from "react";

import { useAppSearchParams } from "@/hooks/useAppSearchParams.hook";
import { useAppDispatch, useAppSelector } from "@/store";
import { ShowAndHideActions } from "@/store/slices/showAndHide/showAndHide.slice";

export function useTransactionDialogVisibility() {
  const { handleKeys } = useAppSearchParams();
  const { isVisible, key } = useAppSelector((state) => state.showAndHide);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isVisible || key !== "dialog") return;

    dispatch(ShowAndHideActions.hide());
    handleKeys({
      remove: ["id"]
    });
  }, [isVisible]);

  return {
    isVisible: isVisible && key === "dialog",
    transactionVisible: isVisible && key === "transaction",
    onOpenChange: () => dispatch(ShowAndHideActions.toggle({ key: "dialog" }))
  };
}
