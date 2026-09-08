import { CircleAlert, PackageOpen, Plus } from "lucide-react";

import { Button } from "@/components/Button/Button.component";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/Dialog/Dialog.component";
import {
  OriginForm,
  type OriginFormOrigin
} from "@/components/Form/Origin/Origin.form";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner.component";

import { useOriginRelationSelection } from "../../hooks/useOriginRelationSelection.hook";
import { RelationListHeader } from "../RelationListHeader/RelationListHeader.component";
import { RelationListState } from "../RelationListState/RelationListState.component";
import { RelationOptionCard } from "../RelationOptionCard/RelationOptionCard.component";

type OriginRelationSelectionProps = {
  origins: OriginFormOrigin[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  setFetchRef: RelationFetchRef;
};

type RelationFetchRef =
  | ((node: HTMLDivElement | HTMLButtonElement | null) => void)
  | null;

export function OriginRelationSelection({
  origins,
  isLoading,
  isError,
  onRetry,
  setFetchRef
}: OriginRelationSelectionProps) {
  const {
    originId,
    originDialogOrigin,
    isOriginDialogOpen,
    openOriginCreationDialog,
    openOriginEditionDialog,
    handleOriginDialogOpenChange,
    handleOriginSuccess,
    handleOriginSelect
  } = useOriginRelationSelection();

  return (
    <div className="space-y-4">
      <RelationListHeader
        title="Origem"
        description="De onde veio ou para onde foi este valor?"
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={openOriginCreationDialog}
      >
        <Plus className="h-4 w-4" />
        Nova origem
      </Button>
      {isLoading ? (
        <RelationListState
          icon={<LoadingSpinner variant="orbit" size="lg" />}
          title="Carregando origens"
          description="Aguarde enquanto buscamos suas origens."
        />
      ) : isError ? (
        <RelationListState
          icon={<CircleAlert className="text-destructive h-8 w-8" />}
          title="Não foi possível carregar as origens"
          description="Tente novamente para exibir as origens disponíveis."
          retryAction={onRetry}
        />
      ) : origins.length === 0 ? (
        <RelationListState
          icon={<PackageOpen className="text-muted-foreground h-8 w-8" />}
          title="Nenhuma origem cadastrada"
          description="Crie uma origem para vinculá-la a esta transação."
        />
      ) : (
        <div className="flex flex-wrap gap-3">
          {origins.map((origin) => (
            <RelationOptionCard
              key={origin.id}
              option={origin}
              isSelected={originId === origin.id}
              onSelect={() => handleOriginSelect(origin)}
              onEdit={() => openOriginEditionDialog(origin)}
            />
          ))}
          <div ref={setFetchRef} className="h-px w-full" />
        </div>
      )}
      <Dialog
        open={isOriginDialogOpen}
        onOpenChange={handleOriginDialogOpenChange}
      >
        <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {originDialogOrigin ? "Editar origem" : "Nova origem"}
            </DialogTitle>
            <DialogDescription>
              {originDialogOrigin
                ? "Atualize os dados desta origem."
                : "Preencha os dados para criar uma nova origem."}
            </DialogDescription>
          </DialogHeader>
          <OriginForm
            origin={originDialogOrigin ?? undefined}
            onSuccess={handleOriginSuccess}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
