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

export function LoginForm() {
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
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="seuEmail@exemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="outline">
          Enviar
        </Button>
      </form>
    </Form>
  );
}
