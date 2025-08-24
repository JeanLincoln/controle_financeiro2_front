import type { Category } from "@/entities/category.entity";
import { useCategoryCreate } from "@/store/requests/category/useCategoryCreate.request";
import { useCategoryUpdate } from "@/store/requests/category/useCategoryUpdate.request";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  CategoryFormSchema,
  categoryFormDefaultValues
} from "../CategoryForm.schema";
import type { CategorySectionProps } from "../CategorySection.component";

export type CreateOrUpdateCategory = Omit<
  Category,
  "id" | "createdAt" | "updatedAt"
>;

export function useCategoryForm({ category }: CategorySectionProps) {
  const form = useForm({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: useMemo(
      () => categoryFormDefaultValues(category),
      [category]
    )
  });

  const { handleCreateCategory, isLoading: isCreating } = useCategoryCreate();
  const { handleUpdateCategory, isLoading: isUpdating } = useCategoryUpdate();

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
  }, [category]);

  return {
    form,
    onSubmit,
    isLoading,
    category
  };
}
