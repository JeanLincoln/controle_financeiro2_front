import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { SubCategory } from "@/entities/subCategory.entity";
import { useSubCategoryCreate } from "@/store/requests/subCategory/useSubCategoryCreate.request";
import { useSubCategoryUpdate } from "@/store/requests/subCategory/useSubCategoryUpdate.request";

import type { SubCategoryFormParams } from "../SubCategory.form";
import {
  subCategoryFormDefaultValues,
  SubCategoryFormSchema,
  type SubCategoryFormSchemaType
} from "../SubCategoryForm.schema";

export type CreateOrUpdateSubCategory = Omit<
  SubCategory,
  "id" | "createdAt" | "updatedAt" | "categoryId"
>;

export const useSubCategoryForm = ({
  categories,
  onSuccess,
  subCategory
}: SubCategoryFormParams) => {
  const firstCategoryId = categories[0]?.id;
  const [categoryId, setCategoryId] = useState<number | undefined>(
    subCategory?.categoryId ?? firstCategoryId
  );
  const form = useForm<SubCategoryFormSchemaType>({
    resolver: zodResolver(SubCategoryFormSchema),
    defaultValues: useMemo(
      () => subCategoryFormDefaultValues(subCategory),
      [subCategory]
    )
  });
  const color = form.watch("color");
  const { handleCreateSubCategory, isLoading: isCreating } =
    useSubCategoryCreate({ successCallback: onSuccess });
  const { handleUpdateSubCategory, isLoading: isUpdating } =
    useSubCategoryUpdate({ successCallback: onSuccess });
  const isLoading = isCreating || isUpdating;
  const shouldSelectCategory = categories.length > 1;

  const handleSubmit = (data: CreateOrUpdateSubCategory) => {
    const selectedCategoryId = categoryId;

    if (!selectedCategoryId) {
      return;
    }

    if (subCategory) {
      handleUpdateSubCategory(selectedCategoryId, subCategory.id, data);
      return;
    }

    handleCreateSubCategory(selectedCategoryId, data);
  };

  useEffect(() => {
    form.reset(subCategoryFormDefaultValues(subCategory));
    setCategoryId(subCategory?.categoryId ?? firstCategoryId);
  }, [firstCategoryId, form, subCategory]);

  return {
    form,
    color,
    isLoading,
    handleSubmit,
    categoryId,
    setCategoryId,
    shouldSelectCategory
  };
};
