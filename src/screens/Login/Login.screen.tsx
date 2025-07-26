import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/Card/Card";
import { LoginForm } from "./components/LoginForm/LoginForm.component";

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Insira suas credenciais para entrar na aplicação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}

export { Login };
