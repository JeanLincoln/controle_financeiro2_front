import type { Origin } from "@/entities/origin.entity";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAppSearchParams } from "@/hooks/useAppSearchParams";
import { useFindOriginById } from "@/requests/origin/useFindOriginById.request";
import { useOriginCreate } from "@/requests/origin/useOriginCreate.request";
import { useOriginUpdate } from "@/requests/origin/useOriginUpdate.request";
import { useAppSelector } from "@/store";
import { useEffect, useMemo } from "react";
import {
  OriginFormSchema,
  originFormDefaultValues
} from "../OriginForm.schema";

export type CreateOrUpdateOrigin = Omit<
  Origin,
  "id" | "createdAt" | "updatedAt"
>;

export function useOriginForm() {
  const {
    idParam,
    getOrigin,
    isLoading: isLoadingOrigin,
    origin
  } = useFindOriginById();

  const { isVisible } = useAppSelector((state) => state.showAndHide);
  const { handleRemoveKey } = useAppSearchParams();
  const form = useForm({
    resolver: zodResolver(OriginFormSchema),
    defaultValues: useMemo(() => originFormDefaultValues(origin), [origin])
  });
  const { handleCreateOrigin, isLoading: isCreating } = useOriginCreate();
  const { handleUpdateOrigin, isLoading: isUpdating } = useOriginUpdate();

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
