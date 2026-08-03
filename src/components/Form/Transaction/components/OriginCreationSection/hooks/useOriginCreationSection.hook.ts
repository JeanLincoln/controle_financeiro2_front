import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import type { Origin } from "@/entities/origin.entity";
import { useCreateOriginMutation } from "@/store/services/origin/origin.service";
import { handleRequest } from "@/utils/handleRequest.utils";

import {
  originFormDefaultValues,
  OriginFormSchema,
  type OriginFormSchemaType
} from "../../../../Origin/OriginForm.schema";

interface UseOriginCreationSectionProps {
  onSuccess: (originId: number) => void;
}

type CreatedOriginResponse = Pick<Origin, "id">;

export function useOriginCreationSection({
  onSuccess
}: UseOriginCreationSectionProps) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [createOrigin, { isLoading }] = useCreateOriginMutation();

  const form = useForm<OriginFormSchemaType>({
    resolver: zodResolver(OriginFormSchema),
    defaultValues: useMemo(() => originFormDefaultValues(), [])
  });

  const colorWatch = form.watch("color");

  const handleToggleForm = useCallback(() => {
    if (isFormVisible) {
      form.reset(originFormDefaultValues());
      setIsFormVisible(false);
      return;
    }

    setIsFormVisible(true);
  }, [form, isFormVisible]);

  const onSubmit = useCallback(
    async (data: OriginFormSchemaType) => {
      const [error, createdOrigin] = await handleRequest(
        createOrigin(data).unwrap() as Promise<CreatedOriginResponse>
      );

      if (error) {
        toast.error("Houve um erro ao criar a origem.");
        return;
      }

      onSuccess(createdOrigin.id);
      setIsFormVisible(false);
      form.reset(originFormDefaultValues());
    },
    [createOrigin, form, onSuccess]
  );

  return {
    colorWatch,
    form,
    handleToggleForm,
    isFormVisible,
    isLoading,
    onSubmit
  };
}
