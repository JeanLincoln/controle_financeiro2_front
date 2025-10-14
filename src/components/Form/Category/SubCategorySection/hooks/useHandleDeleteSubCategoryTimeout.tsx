import { useState } from "react";
import { CircleAlert, Trash } from "lucide-react";
import { toast } from "sonner";

export function useHandleDeleteSubCategoryTimeout() {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | undefined>(
    undefined
  );

  const handleClearTimeout = (id: NodeJS.Timeout) => {
    clearTimeout(id);
    setConfirmDelete(undefined);
    setTimeoutId(null);
  };

  const handleConfirmDelete = (subCategoryId: number) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setConfirmDelete(subCategoryId);
    const fourSeconds = 4000;

    toast.info("Clique novamente para confirmar a exclusão", {
      duration: fourSeconds,
      position: "bottom-right"
    });

    const id = setTimeout(() => {
      handleClearTimeout(id);
    }, fourSeconds);

    setTimeoutId(id);
  };

  const handleDeleteIconRender = (
    subCategoryId: number,
    deleteCallback: () => void
  ) => {
    return !!confirmDelete && confirmDelete === subCategoryId ? (
      <CircleAlert
        className="hover:text-destructive text-destructive h-4 w-4 shrink-0 animate-bounce cursor-pointer transition-all hover:scale-120"
        onClick={() => {
          if (!timeoutId) return;
          handleClearTimeout(timeoutId);
          deleteCallback();
        }}
      />
    ) : (
      <Trash
        className="hover:text-destructive h-3 w-3 shrink-0 cursor-pointer transition-all hover:scale-120"
        onClick={() => handleConfirmDelete(subCategoryId)}
      />
    );
  };

  return {
    confirmDelete,
    handleConfirmDelete,
    handleDeleteIconRender
  };
}
