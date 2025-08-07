import { AlertDialog } from "@/components/AlertDialog/AlertDialog.component";
import { Drawer } from "@/components/Drawer/Drawer.component";
import { StandardPagination } from "@/components/Pagination/Pagination.component";
import { useAppSearchParams } from "@/hooks/useAppSearchParams";
import { FiltersSection } from "./components/FiltersSection/FiltersSection.component";
import { HeaderSection } from "./components/Header/HeaderSection.component";
import { OriginAlertDialog } from "./components/OriginAlertDialog/OriginAlertDialog.component";
import { OriginDrawer } from "./components/OriginDrawer/OriginDrawer.drawer";
import { OriginsListSection } from "./components/OriginsListSection/OriginsListSection.component";
import { OriginsListSectionEmptyState } from "./components/OriginsListSection/OriginsListSectionEmptyState.empty-state";
import { useOriginDialogVisibility } from "./hooks/useOriginAlertDialogVisibility.hook";
import { useOriginDrawerVisibility } from "./hooks/useOriginDrawerVisibility.hook";
import { useOriginScreen } from "./hooks/useOriginScreen.hook";

export default function OriginScreen() {
  const { handleAddKey, handleRemoveKey } = useAppSearchParams();

  const { form, dataIsLoading, dataIsEmpty, response, nameSearch } =
    useOriginScreen();

  const { isVisible: drawerIsVisible, onOpenChange: onDrawerOpenChange } =
    useOriginDrawerVisibility();

  const { isVisible: dialogIsVisible, onOpenChange: onDialogOpenChange } =
    useOriginDialogVisibility();

  return (
    <AlertDialog open={dialogIsVisible} onOpenChange={onDialogOpenChange}>
      <Drawer open={drawerIsVisible} onOpenChange={onDrawerOpenChange}>
        <div className="container flex flex-col min-h-screen gap-4 p-6 mx-auto">
          <HeaderSection handleRemoveSearchParam={handleRemoveKey} />
          <FiltersSection form={form} />
          {dataIsEmpty && (
            <OriginsListSectionEmptyState>
              <span className="text-muted-foreground">
                {nameSearch
                  ? "Não foi encontrada nenhuma origem com este nome"
                  : "Não há origens cadastradas, crie uma!"}
              </span>
            </OriginsListSectionEmptyState>
          )}
          {!dataIsEmpty && (
            <>
              <OriginsListSection
                loading={dataIsLoading}
                origins={response?.data}
                handleAddSearchParam={handleAddKey}
              />
              <StandardPagination
                paginationProps={response?.pagination}
                onChangePage={(page: number) => form.setValue("page", page)}
              />
            </>
          )}
        </div>
        <OriginDrawer />
        <OriginAlertDialog />
      </Drawer>
    </AlertDialog>
  );
}
