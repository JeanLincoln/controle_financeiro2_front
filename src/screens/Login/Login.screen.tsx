import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/Card/Card";
import { LoginForm } from "./components/LoginForm/LoginForm.component";
import { Link } from "react-router";

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
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Não tem uma conta?
            <Link to="/auth/register" className="text-primary hover:underline">
              {" "}
              Registre-se
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export { Login };
