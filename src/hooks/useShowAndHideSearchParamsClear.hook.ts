import { useAppSelector } from "@/store";
import { useEffect } from "react";
import { useAppSearchParams } from "./useAppSearchParams.hook";

type UseShowAndHideSearchParamsClearProps = {
  clearOnUnmount?: string[];
};

export function useShowAndHideSearchParamsClear({
  clearOnUnmount
}: UseShowAndHideSearchParamsClearProps) {
  const { isVisible } = useAppSelector((state) => state.showAndHide);
  const { handleRemoveKey } = useAppSearchParams();

  useEffect(() => {
    if (isVisible || !clearOnUnmount || !clearOnUnmount.length) return;

    clearOnUnmount?.forEach((key) => handleRemoveKey({ key }));
  }, [isVisible]);
}
