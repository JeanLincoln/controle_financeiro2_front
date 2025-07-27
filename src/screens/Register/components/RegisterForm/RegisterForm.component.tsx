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
import { DateOfBirthPicker } from "@/components/DatesPicker/DateOfBirthPicker/DateOfBirthPicker.component";
import { useNavigate } from "react-router";

export function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: registerFormDefaultValues
  });

  const onSubmit = ({
    firstName,
    lastName,
    email,
    password,
    birthDate
  }: RegisterFormSchemaType) => {
    console.log({ firstName, lastName, email, password, birthDate });
  };

  const birthDate = form.watch("birthDate");
  console.log(birthDate);

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
                <Input type="firstName" placeholder="João Paulo" {...field} />
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
                <Input type="lastName" placeholder="Silva" {...field} />
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
                />
              </FormControl>
              {showPassword ? (
                <Eye
                  className="absolute right-3 top-1/2 z-10 bg-card cursor-pointer rounded-full p-1"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <EyeClosed
                  className="absolute right-3 top-1/2 z-10 bg-card cursor-pointer rounded-full p-1 hover:opacity-80 duration-300 ease-in"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <Button
            type="submit"
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogIn className="h-4 w-4" />
            Enviar
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </div>
      </form>
    </Form>
  );
}
