import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import type { TransactionFormSchemaType } from "../../../TransactionForm.schema";
import { RELATION_GROUPS } from "../RelationSelection.component";

type RelationGroup = (typeof RELATION_GROUPS)[keyof typeof RELATION_GROUPS];

export const useRelationSelection = () => {
  const { control } = useFormContext<TransactionFormSchemaType>();
  const [openRelationGroup, setOpenRelationGroup] =
    useState<RelationGroup | null>(RELATION_GROUPS.ORIGIN);
  const categoriesIds = useWatch({
    control,
    name: RELATION_GROUPS.CATEGORIES
  });

  const toggleRelationGroup = (relationGroup: RelationGroup) => {
    setOpenRelationGroup(relationGroup);
  };

  return {
    openRelationGroup,
    toggleRelationGroup,
    canSelectSubCategories: categoriesIds.length > 0
  };
};
