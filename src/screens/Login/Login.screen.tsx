import { Link } from "react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/Card/Card.component";

import { LoginForm } from "./components/LoginForm/LoginForm.component";

function Login() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
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
          <p className="text-muted-foreground text-sm">
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
