import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/Card/Card.component";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner.component";

import { ProfileForm } from "./components/ProfileForm/ProfileForm.component";
import { useProfileScreen } from "./hooks/useProfileScreen.hook";

export function ProfileScreen() {
  const { hasAuthenticatedUser, isLoading, user } = useProfileScreen();

  return (
    <div className="container mx-auto flex min-h-screen max-w-3xl flex-col gap-4 p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Meu perfil</CardTitle>
          <CardDescription>
            Atualize seus dados pessoais e credenciais de acesso.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-50 items-center justify-center">
              <LoadingSpinner variant="orbit" size="lg" />
            </div>
          ) : user ? (
            <ProfileForm user={user} />
          ) : (
            <p className="text-muted-foreground text-sm">
              {hasAuthenticatedUser
                ? "Não foi possível carregar os dados do perfil."
                : "Faça login novamente para acessar seu perfil."}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
