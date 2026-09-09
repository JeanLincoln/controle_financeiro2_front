import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import type { OriginFormOrigin } from "@/components/Form/Origin/Origin.form";
import { useDeleteOrigin } from "@/store/requests/origin/useDeleteOrigin.request";

import type { TransactionFormSchemaType } from "../../../TransactionForm.schema";
import { RELATION_GROUPS } from "../RelationSelection.component";

export const useOriginRelationSelection = () => {
  const { control, setValue } = useFormContext<TransactionFormSchemaType>();
  const { handleDeleteOrigin, isLoading: isDeletingOrigin } = useDeleteOrigin();

  const [originDialogOrigin, setOriginDialogOrigin] =
    useState<OriginFormOrigin | null>(null);
  const [isOriginDialogOpen, setIsOriginDialogOpen] = useState(false);
  const [originPendingDeletion, setOriginPendingDeletion] =
    useState<OriginFormOrigin | null>(null);

  const originId = useWatch({ control, name: RELATION_GROUPS.ORIGIN });

  const openOriginCreationDialog = () => {
    setOriginDialogOrigin(null);
    setIsOriginDialogOpen(true);
  };

  const openOriginEditionDialog = (origin: OriginFormOrigin) => {
    setOriginDialogOrigin(origin);
    setIsOriginDialogOpen(true);
  };

  const handleOriginDialogOpenChange = (isOpen: boolean) => {
    setIsOriginDialogOpen(isOpen);

    if (!isOpen) {
      setOriginDialogOrigin(null);
    }
  };

  const handleOriginSuccess = (origin?: OriginFormOrigin) => {
    if (origin) {
      setValue(RELATION_GROUPS.ORIGIN, origin.id, { shouldDirty: true });
    }

    handleOriginDialogOpenChange(false);
  };

  const handleOriginSelect = (origin: OriginFormOrigin) =>
    setValue(RELATION_GROUPS.ORIGIN, originId === origin.id ? 0 : origin.id, {
      shouldDirty: true
    });

  const openOriginDeletionDialog = (origin: OriginFormOrigin) => {
    setOriginPendingDeletion(origin);
  };

  const handleOriginDeletionDialogOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setOriginPendingDeletion(null);
    }
  };

  const confirmOriginDeletion = async () => {
    if (!originPendingDeletion) return;

    await handleDeleteOrigin(originPendingDeletion.id);

    if (originId === originPendingDeletion.id) {
      setValue(RELATION_GROUPS.ORIGIN, 0, { shouldDirty: true });
    }

    setOriginPendingDeletion(null);
  };

  return {
    originId,
    originDialogOrigin,
    isOriginDialogOpen,
    openOriginCreationDialog,
    openOriginEditionDialog,
    handleOriginDialogOpenChange,
    handleOriginSuccess,
    handleOriginSelect,
    originPendingDeletion,
    isDeletingOrigin,
    openOriginDeletionDialog,
    handleOriginDeletionDialogOpenChange,
    confirmOriginDeletion
  };
};
