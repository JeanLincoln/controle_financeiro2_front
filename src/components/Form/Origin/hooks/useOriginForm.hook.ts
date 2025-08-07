import type { Origin } from "@/entities/origin.entity";
import { useAppSearchParams } from "@/hooks/useAppSearchParams";
import { useFindOriginById } from "@/requests/origin/useFindOriginById.request";
import { useOriginCreate } from "@/requests/origin/useOriginCreate.request";
import { useOriginUpdate } from "@/requests/origin/useOriginUpdate.request";
import { useAppDispatch, useAppSelector } from "@/store";
import { ShowAndHideActions } from "@/store/slices/showAndHide/showAndHide.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  OriginFormSchema,
  originFormDefaultValues
} from "../OriginForm.schema";

export type CreateOrUpdateOrigin = Omit<
  Origin,
  "id" | "createdAt" | "updatedAt"
>;

const onCreateOrUpdateSuccess = (dispatch: Dispatch<UnknownAction>) => {
  dispatch(ShowAndHideActions.hide());
};

export function useOriginForm() {
  const { isVisible } = useAppSelector((state) => state.showAndHide);
  const dispatch = useAppDispatch();
  const {
    idParam,
    getOrigin,
    isLoading: isLoadingOrigin,
    origin
  } = useFindOriginById();

  const { handleRemoveKey } = useAppSearchParams();

  const form = useForm({
    resolver: zodResolver(OriginFormSchema),
    defaultValues: useMemo(() => originFormDefaultValues(origin), [origin])
  });

  const { handleCreateOrigin, isLoading: isCreating } = useOriginCreate({
    successCallback: () => onCreateOrUpdateSuccess(dispatch)
  });
  const { handleUpdateOrigin, isLoading: isUpdating } = useOriginUpdate({
    successCallback: () => onCreateOrUpdateSuccess(dispatch)
  });

  const colorWatch = form.watch("color");

  const onSubmit = (data: CreateOrUpdateOrigin) => {
    if (origin) {
      handleUpdateOrigin(origin.id, data);
      return;
    }

    handleCreateOrigin(data);
  };

  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    form.reset(originFormDefaultValues(origin));
  }, [origin, isLoadingOrigin]);

  useEffect(() => {
    if (isVisible) return;
    handleRemoveKey({ key: "id" });
  }, [isVisible]);

  useEffect(() => {
    getOrigin();
  }, [idParam]);

  return {
    form,
    colorWatch,
    onSubmit,
    isLoading,
    isLoadingOrigin
  };
}
