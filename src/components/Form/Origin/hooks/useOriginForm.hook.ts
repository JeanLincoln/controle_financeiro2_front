import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Origin } from "@/entities/origin.entity";
import { useFindOriginById } from "@/store/requests/origin/useFindOriginById.request";
import { useOriginCreate } from "@/store/requests/origin/useOriginCreate.request";
import { useOriginUpdate } from "@/store/requests/origin/useOriginUpdate.request";

import {
  originFormDefaultValues,
  OriginFormSchema
} from "../OriginForm.schema";

export type CreateOrUpdateOrigin = Omit<
  Origin,
  "id" | "createdAt" | "updatedAt"
>;

type UseOriginFormProps = {
  successCallback?: () => void;
  errorCallback?: () => void;
};

export function useOriginForm({
  successCallback,
  errorCallback
}: UseOriginFormProps = {}) {
  const {
    idParam,
    getOrigin,
    isLoading: isLoadingOrigin,
    origin
  } = useFindOriginById();

  const form = useForm({
    resolver: zodResolver(OriginFormSchema),
    defaultValues: useMemo(() => originFormDefaultValues(origin), [origin])
  });

  const { handleCreateOrigin, isLoading: isCreating } = useOriginCreate({
    successCallback,
    errorCallback
  });
  const { handleUpdateOrigin, isLoading: isUpdating } = useOriginUpdate({
    successCallback,
    errorCallback
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
