import type { Category } from "@/entities/category.entity";
import { useAppSearchParams } from "@/hooks/useAppSearchParams";
import { useAppDispatch, useAppSelector } from "@/store";
import { useCategoryCreate } from "@/store/requests/category/useCategoryCreate.request";
import { useCategoryUpdate } from "@/store/requests/category/useCategoryUpdate.request";
import { useFindCategoryById } from "@/store/requests/category/useFindCategoryById.request";
import { ShowAndHideActions } from "@/store/slices/showAndHide/showAndHide.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  CategoryFormSchema,
  categoryFormDefaultValues
} from "../CategoryForm.schema";

export type CreateOrUpdateCategory = Omit<
  Category,
  "id" | "createdAt" | "updatedAt"
>;

const onCreateOrUpdateSuccess = (dispatch: Dispatch<UnknownAction>) => {
  dispatch(ShowAndHideActions.hide());
};

export function useCategoryForm() {
  const { isVisible } = useAppSelector((state) => state.showAndHide);
  const dispatch = useAppDispatch();
  const {
    idParam,
    getCategory,
    isLoading: isLoadingCategory,
    category
  } = useFindCategoryById();

  const { handleRemoveKey } = useAppSearchParams();

  const form = useForm({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: useMemo(
      () => categoryFormDefaultValues(category),
      [category]
    )
  });

  const { handleCreateCategory, isLoading: isCreating } = useCategoryCreate({
    successCallback: () => onCreateOrUpdateSuccess(dispatch)
  });
  const { handleUpdateCategory, isLoading: isUpdating } = useCategoryUpdate({
    successCallback: () => onCreateOrUpdateSuccess(dispatch)
  });

  const colorWatch = form.watch("color");

  const onSubmit = (data: CreateOrUpdateCategory) => {
    if (category) {
      handleUpdateCategory(category.id, data);
      return;
    }

    handleCreateCategory(data);
  };

  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    form.reset(categoryFormDefaultValues(category));
  }, [category, isLoadingCategory]);

  useEffect(() => {
    if (isVisible) return;
    handleRemoveKey({ key: "id" });
  }, [isVisible]);

  useEffect(() => {
    getCategory();
  }, [idParam]);

  return {
    form,
    colorWatch,
    onSubmit,
    isLoading,
    isLoadingCategory
  };
}
