import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/Card/Card.component";

import { RegisterForm } from "./components/RegisterForm/RegisterForm.component";

export default function Register() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle>Cadastro</CardTitle>
          <CardDescription>
            Cadastre-se na aplicação para começar a usar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
