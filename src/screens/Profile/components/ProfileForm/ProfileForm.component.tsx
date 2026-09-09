import { Eye, EyeClosed, LetterText, Lock, Mail, Save } from "lucide-react";

import { Button } from "@/components/Button/Button.component";
import { DateOfBirthPicker } from "@/components/DatesPicker/DateOfBirthPicker/DateOfBirthPicker.component";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/Form/Form.component";
import { Input } from "@/components/Input/Input.component";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner.component";
import type { User } from "@/entities/user.entity";

import { useProfileForm } from "./hooks/useProfileForm.hook";

type ProfileFormProps = {
  user: User;
};

export function ProfileForm({ user }: ProfileFormProps) {
  const {
    form,
    handleSubmit,
    isLoading,
    passwordIsVisible,
    togglePasswordVisibility
  } = useProfileForm({ user });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid gap-6 md:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2" required>
                <LetterText className="h-4 w-4" />
                Primeiro nome
              </FormLabel>
              <FormControl>
                <Input type="text" placeholder="João" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2" required>
                <LetterText className="h-4 w-4" />
                Sobrenome
              </FormLabel>
              <FormControl>
                <Input type="text" placeholder="Silva" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <LetterText className="h-4 w-4" />
                Data de nascimento
              </FormLabel>
              <FormControl>
                <DateOfBirthPicker
                  date={field.value}
                  onSelectDate={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2" required>
                <Mail className="h-4 w-4" />
                E-mail
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="flex items-center gap-2" required>
                <Lock className="h-4 w-4" />
                Nova senha
              </FormLabel>
              <FormControl>
                <Input
                  type={passwordIsVisible ? "text" : "password"}
                  placeholder="********"
                  {...field}
                  icon={
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={
                        passwordIsVisible ? "Ocultar senha" : "Mostrar senha"
                      }
                      onClick={togglePasswordVisibility}
                    >
                      {passwordIsVisible ? <EyeClosed /> : <Eye />}
                    </Button>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end md:col-span-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <LoadingSpinner size="sm" variant="default" />
            ) : (
              <>
                <Save />
                Salvar alterações
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
