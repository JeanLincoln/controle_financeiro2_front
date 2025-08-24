import { CircleAlert, Trash } from "lucide-react";
import { useState } from "react";
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
        className="w-4 h-4 shrink-0 transition-all cursor-pointer hover:scale-120 hover:text-destructive animate-bounce text-destructive"
        onClick={() => {
          if (!timeoutId) return;
          console.log({ timeoutId });
          handleClearTimeout(timeoutId);
          deleteCallback();
        }}
      />
    ) : (
      <Trash
        className="w-3 h-3 shrink-0 transition-all cursor-pointer hover:scale-120 hover:text-destructive"
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
