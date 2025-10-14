import { useNavigate } from "react-router";

import { Button } from "@/components/Button/Button.component";

export default function PageNotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="space-y-6 px-4 text-center">
        <div className="space-y-2">
          <h1 className="text-primary/20 text-9xl font-bold select-none">
            404
          </h1>
          <div className="bg-primary mx-auto h-1 w-24 rounded-full"></div>
        </div>
        <div className="space-y-4">
          <h2 className="text-foreground text-3xl font-semibold">
            Página não encontrada
          </h2>
          <p className="text-muted-foreground mx-auto max-w-md text-lg">
            Ops! A página que você está procurando não existe ou foi movida.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
          <Button onClick={handleGoHome} className="w-full sm:w-auto">
            Voltar ao início
          </Button>
          <Button
            variant="outline"
            onClick={handleGoBack}
            className="w-full sm:w-auto"
          >
            Página anterior
          </Button>
        </div>
        <div className="border-border/50 border-t pt-8">
          <p className="text-muted-foreground text-sm">
            Se você acredita que isso é um erro, entre em contato com o suporte.
          </p>
        </div>
      </div>
    </div>
  );
}
