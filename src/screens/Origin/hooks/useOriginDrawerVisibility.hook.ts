import { useAppSearchParams } from "@/hooks/useAppSearchParams";
import { useAppDispatch, useAppSelector } from "@/store";
import { ShowAndHideActions } from "@/store/slices/showAndHide/showAndHide.slice";
import { useEffect } from "react";

export function useOriginDrawerVisibility() {
  const { handleRemoveKey } = useAppSearchParams();
  const { isVisible, key } = useAppSelector((state) => state.showAndHide);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(ShowAndHideActions.hide());
      handleRemoveKey({ key: "id" });
    };
  }, []);

  return {
    isVisible: isVisible && key === "drawer",
    onOpenChange: () => dispatch(ShowAndHideActions.toggle({ key: "drawer" }))
  };
}
