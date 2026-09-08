import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Origin } from "@/entities/origin.entity";
import { useOriginCreate } from "@/store/requests/origin/useOriginCreate.request";
import { useOriginUpdate } from "@/store/requests/origin/useOriginUpdate.request";

import type { OriginFormOrigin } from "../Origin.form";
import {
  originFormDefaultValues,
  OriginFormSchema
} from "../OriginForm.schema";

export type CreateOrUpdateOrigin = Omit<
  Origin,
  "id" | "createdAt" | "updatedAt"
>;

type UseOriginFormProps = {
  origin?: OriginFormOrigin;
  successCallback?: (origin?: Origin) => void;
  errorCallback?: () => void;
};

export function useOriginForm({
  origin,
  successCallback,
  errorCallback
}: UseOriginFormProps = {}) {
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
  }, [form, origin]);

  return {
    form,
    colorWatch,
    onSubmit,
    isLoading
  };
}
