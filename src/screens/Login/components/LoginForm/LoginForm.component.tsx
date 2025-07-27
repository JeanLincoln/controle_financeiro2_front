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

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: loginFormDefaultValues
  });

  const onSubmit = ({ email, password }: LoginFormSchemaType) => {
    console.log({ email, password });
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
          className="flex items-center gap-2"
        >
          <LogIn className="h-4 w-4" />
          Enviar
        </Button>
      </form>
    </Form>
  );
}
