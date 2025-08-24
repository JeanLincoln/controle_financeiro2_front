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
import { CATEGORY_ID_FORM_KEY } from "@/components/Form/Category/Category.form";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner.component";
import { useAppSearchParams } from "@/hooks/useAppSearchParams.hook";
import { useDeleteCategory } from "@/store/requests/category/useDeleteCategory.request";
import { Trash, X } from "lucide-react";
import { useSearchParams } from "react-router";

export function CategoryAlertDialog() {
  const [params] = useSearchParams();
  const id = params.get(CATEGORY_ID_FORM_KEY);
  const { handleRemoveKey } = useAppSearchParams();
  const { handleDeleteCategory, isLoading } = useDeleteCategory();

  return (
    <>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Isso vai remover essa categoria de todas as transações que a têm.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              type="button"
              variant="default"
              className="flex items-center gap-2 w-fit text-white "
              disabled={isLoading}
              onClick={() => handleRemoveKey({ key: CATEGORY_ID_FORM_KEY })}
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
                handleDeleteCategory(Number(id));
                handleRemoveKey({ key: CATEGORY_ID_FORM_KEY });
              }}
            >
              {isLoading ? (
                <LoadingSpinner size="sm" variant="orbit" />
              ) : (
                <>
                  <Trash className="h-4 w-4" />
                  Deletar categoria
                </>
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  );
}
