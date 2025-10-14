import { useAppSearchParams } from "@/hooks/useAppSearchParams.hook";
import { useAppDispatch, useAppSelector } from "@/store";
import { ShowAndHideActions } from "@/store/slices/showAndHide/showAndHide.slice";
import { useEffect } from "react";

export function useTransactionDrawerVisibility() {
  const { handleRemoveKey } = useAppSearchParams();
  const { isVisible, key } = useAppSelector((state) => state.showAndHide);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isVisible || key !== "drawer") return;

    dispatch(ShowAndHideActions.hide());
    handleRemoveKey({ key: "id" });
    handleRemoveKey({ key: "edit" });
  }, [isVisible]);

  return {
    isVisible: isVisible && key === "drawer",
    onOpenChange: () => dispatch(ShowAndHideActions.toggle({ key: "drawer" }))
  };
}
