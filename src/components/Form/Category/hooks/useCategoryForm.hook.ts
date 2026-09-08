import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Category } from "@/entities/category.entity";
import { useCategoryCreate } from "@/store/requests/category/useCategoryCreate.request";
import { useCategoryUpdate } from "@/store/requests/category/useCategoryUpdate.request";

import type { CategoryFormProps } from "../Category.form";
import {
  categoryFormDefaultValues,
  CategoryFormSchema,
  type CategoryFormSchemaType
} from "../CategoryForm.schema";

export type CategoryFormParams = Pick<
  Category,
  "id" | "name" | "description" | "color" | "icon"
>;

export type CreateOrUpdateCategory = Omit<
  Category,
  "id" | "createdAt" | "updatedAt"
>;

export const useCategoryForm = ({ onSuccess, category }: CategoryFormProps) => {
  const form = useForm<CategoryFormSchemaType>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: useMemo(
      () => categoryFormDefaultValues(category),
      [category]
    )
  });
  const color = form.watch("color");
  const { handleCreateCategory, isLoading: isCreating } = useCategoryCreate({
    successCallback: onSuccess
  });
  const { handleUpdateCategory, isLoading: isUpdating } = useCategoryUpdate({
    successCallback: () => onSuccess()
  });
  const isLoading = isCreating || isUpdating;

  const handleSubmit = (data: CreateOrUpdateCategory) => {
    if (category) {
      handleUpdateCategory(category.id, data);
      return;
    }

    handleCreateCategory(data);
  };

  useEffect(() => {
    form.reset(categoryFormDefaultValues(category));
  }, [category, form]);

  return {
    form,
    color,
    isLoading,
    handleSubmit
  };
};
