import { useAppSearchParams } from "@/hooks/useAppSearchParams.hook";
import { useAppDispatch, useAppSelector } from "@/store";
import { ShowAndHideActions } from "@/store/slices/showAndHide/showAndHide.slice";
import { useEffect } from "react";

export function useTransactionDialogVisibility() {
  const { handleRemoveKey } = useAppSearchParams();
  const { isVisible, key } = useAppSelector((state) => state.showAndHide);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isVisible || key !== "dialog") return;

    dispatch(ShowAndHideActions.hide());
    handleRemoveKey({ key: "id" });
  }, [isVisible]);

  return {
    isVisible: isVisible && key === "dialog",
    transactionVisible: isVisible && key === "transaction",
    onOpenChange: () => dispatch(ShowAndHideActions.toggle({ key: "dialog" }))
  };
}
