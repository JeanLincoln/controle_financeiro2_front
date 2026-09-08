import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import type { SubCategoryFormParams } from "@/components/Form/SubCategory/SubCategory.form";

import type { TransactionFormSchemaType } from "../../../TransactionForm.schema";
import { RELATION_GROUPS } from "../RelationSelection.component";

export const useSubCategoryRelationSelection = () => {
  const { control, setValue } = useFormContext<TransactionFormSchemaType>();

  const [subCategoryDialogSubCategory, setSubCategoryDialogSubCategory] =
    useState<SubCategoryFormParams | null>(null);
  const [isSubCategoryDialogOpen, setIsSubCategoryDialogOpen] = useState(false);

  const categoriesIds = useWatch({
    control,
    name: RELATION_GROUPS.CATEGORIES
  });

  const subCategoriesIds = useWatch({
    control,
    name: RELATION_GROUPS.SUB_CATEGORIES
  });
  const canSelectSubCategories = categoriesIds.length > 0;

  const openSubCategoryCreationDialog = () => {
    setSubCategoryDialogSubCategory(null);
    setIsSubCategoryDialogOpen(true);
  };

  const openSubCategoryEditionDialog = (subCategory: SubCategoryFormParams) => {
    setSubCategoryDialogSubCategory(subCategory);
    setIsSubCategoryDialogOpen(true);
  };

  const handleSubCategoryDialogOpenChange = (isOpen: boolean) => {
    setIsSubCategoryDialogOpen(isOpen);

    if (!isOpen) {
      setSubCategoryDialogSubCategory(null);
    }
  };

  const toggleSubCategorySelection = (subCategoryId: number) => {
    const updatedValues = subCategoriesIds.includes(subCategoryId)
      ? subCategoriesIds.filter(
          (selectedValue) => selectedValue !== subCategoryId
        )
      : [...subCategoriesIds, subCategoryId];

    setValue(RELATION_GROUPS.SUB_CATEGORIES, updatedValues, {
      shouldDirty: true
    });
  };

  const handleSubCategorySuccess = (subCategoryId?: number) => {
    if (subCategoryId) {
      toggleSubCategorySelection(subCategoryId);
    }

    handleSubCategoryDialogOpenChange(false);
  };

  return {
    subCategoryDialogSubCategory,
    isSubCategoryDialogOpen,
    openSubCategoryCreationDialog,
    openSubCategoryEditionDialog,
    handleSubCategoryDialogOpenChange,
    handleSubCategorySuccess,
    categoriesIds,
    subCategoriesIds,
    canSelectSubCategories,
    toggleSubCategorySelection
  };
};
