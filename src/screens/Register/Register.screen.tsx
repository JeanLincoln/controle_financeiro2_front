import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/Card/Card.component";
import { RegisterForm } from "./components/RegisterForm/RegisterForm.component";

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
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
