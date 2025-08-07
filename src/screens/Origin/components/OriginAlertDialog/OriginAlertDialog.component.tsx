import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/AlertDialog/AlertDialog.component";
import { Button } from "@/components/Button/Button.component";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner.component";
import { useAppSearchParams } from "@/hooks/useAppSearchParams";
import { useDeleteOrigin } from "@/requests/origin/useDeleteOrigin.request";
import { Trash, X } from "lucide-react";
import { useSearchParams } from "react-router";

export function OriginAlertDialog() {
  const [params] = useSearchParams();
  const id = params.get("id");
  const { handleRemoveKey } = useAppSearchParams();
  const { handleDeleteOrigin, isLoading } = useDeleteOrigin();

  return (
    <>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Isso vai remover essa origem de todas as transações que a têm.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              type="button"
              variant="default"
              className="flex items-center gap-2 w-fit text-white "
              disabled={isLoading}
              onClick={() => handleRemoveKey({ key: "id" })}
            >
              <X className="h-4 w-4" />
              Cancelar
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              type="button"
              variant="destructive"
              className="flex items-center gap-2 w-fit text-white"
              disabled={isLoading}
              onClick={() => {
                handleDeleteOrigin(Number(id));
                handleRemoveKey({ key: "id" });
              }}
            >
              {isLoading ? (
                <LoadingSpinner size="sm" variant="orbit" />
              ) : (
                <>
                  <Trash className="h-4 w-4" />
                  Deletar origem
                </>
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  );
}
