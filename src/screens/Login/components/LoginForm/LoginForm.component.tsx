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
import { useForm } from "react-hook-form";
import {
  loginFormDefaultValues,
  LoginFormSchema,
  type LoginFormSchemaType
} from "./LoginForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, LogIn, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useLoginMutation } from "@/store/services/auth/auth.service";
import { handleRequest } from "@/utils/handleRequest.utils";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/store";
import { AuthActions } from "@/store/slices/auth/auth.slice";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner.component";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: loginFormDefaultValues
  });

  const onSubmit = async ({ email, password }: LoginFormSchemaType) => {
    const [error, response] = await handleRequest(
      login({ email, password }).unwrap()
    );

    if (error) {
      toast.error("Houve um erro ao fazer login. Verifique suas credenciais.");
      return;
    }

    dispatch(AuthActions.login(response));
    toast.success("Login realizado com sucesso!");
    navigate("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
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
              <FormLabel className="flex items-center gap-2">
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
        <Button
          type="submit"
          variant="outline"
          className="flex items-center gap-2 w-24"
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingSpinner size="sm" variant="orbit" />
          ) : (
            <>
              <LogIn className="h-4 w-4" />
              Entrar
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
