import type { SubCategory } from "@/entities/subCategory.entity";
import { useAppSearchParams } from "@/hooks/useAppSearchParams.hook";
import { useDeleteSubCategory } from "@/store/requests/subCategory/useDeleteSubCategory.request";
import { useFindSubCategoryById } from "@/store/requests/subCategory/useFindSubCategoryById.request";
import { useSubCategoryCreate } from "@/store/requests/subCategory/useSubCategoryCreate.request";
import { useSubCategoryUpdate } from "@/store/requests/subCategory/useSubCategoryUpdate.request";
import type { CategoryFindByIdResponse } from "@/store/services/category/categoryService.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import { SUB_CATEGORY_ID_FORM_KEY } from "../../Category.form";
import {
  SubCategoryFormSchema,
  subCategoryFormDefaultValues
} from "../SubCategoryForm.schema";

type SubCategorySectionProps = {
  category?: CategoryFindByIdResponse;
};

export type CreateOrUpdateSubCategory = Omit<
  SubCategory,
  "id" | "createdAt" | "updatedAt"
>;

const onCreateOrUpdateSuccess = ({
  handleRemoveKey
}: Pick<ReturnType<typeof useAppSearchParams>, "handleRemoveKey">) => {
  handleRemoveKey({ key: SUB_CATEGORY_ID_FORM_KEY });
};

export function useSubCategoryForm({ category }: SubCategorySectionProps) {
  const [params] = useSearchParams();
  const formState = params.get(SUB_CATEGORY_ID_FORM_KEY);
  const { handleAddKey, handleRemoveKey } = useAppSearchParams();

  const { subCategory } = useFindSubCategoryById({
    categoryId: category?.id,
    subCategoryId: Number.isInteger(Number(formState))
      ? Number(formState)
      : undefined
  });

  const form = useForm({
    resolver: zodResolver(SubCategoryFormSchema),
    defaultValues: useMemo(
      () => subCategoryFormDefaultValues(subCategory),
      [subCategory]
    )
  });

  const colorWatch = form.watch("color");

  const { handleCreateSubCategory, isLoading: isCreating } =
    useSubCategoryCreate({
      successCallback: () => onCreateOrUpdateSuccess({ handleRemoveKey })
    });
  const { handleUpdateSubCategory, isLoading: isUpdating } =
    useSubCategoryUpdate({
      successCallback: () => onCreateOrUpdateSuccess({ handleRemoveKey })
    });

  const { handleDeleteSubCategory, isLoading: isDeleting } =
    useDeleteSubCategory();

  const onSubmit = (data: CreateOrUpdateSubCategory) => {
    const creating = formState === "create";
    if (!category) return;

    if (creating) {
      handleCreateSubCategory(category.id, data);
      return;
    }
    if (!subCategory) {
      toast.error("Ocorreu um erro, atualize a página e tente novamente.");
      return;
    }
    handleUpdateSubCategory(category.id, subCategory.id, data);
  };

  const handleCreateSubCategoryButton = useCallback(() => {
    if (formState) {
      handleRemoveKey({ key: SUB_CATEGORY_ID_FORM_KEY });
      return;
    }

    handleAddKey({ key: SUB_CATEGORY_ID_FORM_KEY, value: "create" });
  }, [formState]);

  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    form.reset(
      subCategoryFormDefaultValues(
        formState === "create" ? undefined : subCategory
      )
    );
  }, [subCategory, formState]);

  return {
    form,
    formState,
    colorWatch,
    onSubmit,
    isLoading,
    handleCreateSubCategoryButton,
    handleAddKey,
    handleDeleteSubCategory,
    isDeleting
  };
}
