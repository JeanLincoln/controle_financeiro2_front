import { CATEGORY_ID_FORM_KEY } from "@/components/Form/Category/Category.form";
import { useAppSearchParams } from "@/hooks/useAppSearchParams.hook";
import { useAppDispatch, useAppSelector } from "@/store";
import { ShowAndHideActions } from "@/store/slices/showAndHide/showAndHide.slice";
import { useEffect } from "react";

export function useCategoryDialogVisibility() {
  const { handleRemoveKey } = useAppSearchParams();
  const { isVisible, key } = useAppSelector((state) => state.showAndHide);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(ShowAndHideActions.hide());
      handleRemoveKey({ key: CATEGORY_ID_FORM_KEY });
    };
  }, []);

  return {
    isVisible: isVisible && key === "dialog",
    onOpenChange: () => dispatch(ShowAndHideActions.toggle({ key: "dialog" }))
  };
}
