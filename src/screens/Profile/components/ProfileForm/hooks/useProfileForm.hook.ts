import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { User } from "@/entities/user.entity";
import { useAppDispatch } from "@/store";
import { useUserUpdate } from "@/store/requests/user/useUserUpdate.request";
import { AuthActions } from "@/store/slices/auth/auth.slice";

import {
  profileFormDefaultValues,
  ProfileFormSchema,
  type ProfileFormSchemaType
} from "../ProfileForm.schema";

interface UseProfileFormProps {
  user: User;
}

export function useProfileForm({ user }: UseProfileFormProps) {
  const dispatch = useAppDispatch();
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const { handleUpdateUser, isLoading } = useUserUpdate({
    successCallback: (data) => {
      dispatch(
        AuthActions.updateUser({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          birthDate: data.birthDate
        })
      );
    }
  });
  const form = useForm<ProfileFormSchemaType>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: profileFormDefaultValues(user)
  });

  async function handleSubmit(data: ProfileFormSchemaType) {
    await handleUpdateUser(data);
  }

  function togglePasswordVisibility() {
    setPasswordIsVisible((currentValue) => !currentValue);
  }

  return {
    form,
    handleSubmit,
    isLoading,
    passwordIsVisible,
    togglePasswordVisibility
  };
}
