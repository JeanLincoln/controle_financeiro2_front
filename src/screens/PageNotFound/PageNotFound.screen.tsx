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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-9xl font-bold text-primary/20 select-none">
            404
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-foreground">
            Página não encontrada
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Ops! A página que você está procurando não existe ou foi movida.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
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
        <div className="pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Se você acredita que isso é um erro, entre em contato com o suporte.
          </p>
        </div>
      </div>
    </div>
  );
}
