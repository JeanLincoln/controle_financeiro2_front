import { Button } from "@/components/Button/Button.component";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form
} from "@/components/Form/Form.component";
import { Input } from "@/components/Input/Input.component";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner.component";
import { useForm } from "react-hook-form";
import {
  registerFormDefaultValues,
  RegisterFormSchema,
  type RegisterFormSchemaType
} from "./RegisterForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  Lock,
  LogIn,
  Eye,
  EyeClosed,
  LetterText,
  ArrowLeft
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useRegisterMutation } from "@/store/services/auth/auth.service";
import { handleRequest } from "@/utils/handleRequest.utils";
import { toast } from "sonner";
import { useAppDispatch } from "@/store";
import { AuthActions } from "@/store/slices/auth/auth.slice";
import { DateOfBirthPicker } from "@/components/DatesPicker/DateOfBirthPicker/DateOfBirthPicker.component";

export function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [register, { isLoading }] = useRegisterMutation();
  const form = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: registerFormDefaultValues
  });

  const onSubmit = async (data: RegisterFormSchemaType) => {
    const [error, response] = await handleRequest(register(data).unwrap());

    if (error) {
      toast.error("Houve um erro ao cadastrar usuário, tente novamente.");
      return;
    }

    dispatch(AuthActions.login(response));
    toast.success("Cadastro realizado com sucesso!");
    navigate("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2" required>
                <LetterText className="h-4 w-4" />
                Primeiro Nome
              </FormLabel>
              <FormControl>
                <Input type="text" placeholder="João Paulo" {...field} />
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
                <Mail className="h-4 w-4" />
                Data de nascimento
              </FormLabel>
              <FormControl>
                <DateOfBirthPicker
                  date={field.value ? new Date(field.value) : undefined}
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
                  placeholder="seuEmail@exemplo.com"
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
            <FormItem className="relative">
              <FormLabel className="flex items-center gap-2" required>
                <Lock className="h-4 w-4" />
                Senha
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="********"
                  type={showPassword ? "text" : "password"}
                  {...field}
                  icon={
                    showPassword ? (
                      <Eye onClick={() => setShowPassword(!showPassword)} />
                    ) : (
                      <EyeClosed
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <Button
            type="submit"
            variant="outline"
            className="flex items-center gap-2 min-w-[100px]"
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingSpinner size="sm" variant="orbit" />
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                Enviar
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
