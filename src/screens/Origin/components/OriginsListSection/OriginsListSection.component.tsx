import { AlertDialogTrigger } from "@/components/AlertDialog/AlertDialog.component";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/Card/Card.component";
import { DrawerTrigger } from "@/components/Drawer/Drawer.component";
import { getIconComponent } from "@/components/IconSelector/utils/iconSelector.utils";
import { useAppSearchParams } from "@/hooks/useAppSearchParams";
import type { OriginFindAllResponse } from "@/store/services/origin/originService.types";
import { Pencil, Trash } from "lucide-react";
import { OriginsListSectionSkeleton } from "./OriginsListSectionSkeleton.skeleton";

type OriginsListSectionProps = {
  origins?: OriginFindAllResponse["data"];
  loading: boolean;
};

export function OriginsListSection({
  origins,
  loading
}: OriginsListSectionProps) {
  const { handleAddKey } = useAppSearchParams();

  const dataIsLoaded = !loading && origins && origins.length > 0;
  return (
    <div className="flex flex-col  justify-between h-[512px]">
      {loading && <OriginsListSectionSkeleton />}
      <div className="flex flex-wrap w-full gap-4 ">
        {dataIsLoaded &&
          origins.map((origin) => {
            const SelectedIcon = getIconComponent(origin.icon);

            return (
              <Card
                className="relative w-full gap-3 h-35 max-w-74"
                key={origin.id}
              >
                <CardHeader>
                  <CardTitle className="line-clamp-1" withTooltip>
                    {origin.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-1" withTooltip>
                    {origin.description || "Sem descrição"}
                  </CardDescription>
                  <CardAction className="flex flex-col items-center gap-4">
                    <AlertDialogTrigger asChild>
                      <Trash
                        className="w-4 h-4 text-red-500 transition-all cursor-pointer hover:scale-120 "
                        onClick={() =>
                          handleAddKey({ key: "id", value: origin.id })
                        }
                      />
                    </AlertDialogTrigger>
                    <DrawerTrigger asChild>
                      <Pencil
                        className="w-4 h-4 text-blue-500 transition-all cursor-pointer hover:scale-120"
                        onClick={() =>
                          handleAddKey({ key: "id", value: origin.id })
                        }
                      />
                    </DrawerTrigger>
                  </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">
                    <b>Criado Em:</b>{" "}
                    {new Date(origin.createdAt).toLocaleDateString()}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    <b>Atualizado Em:</b>{" "}
                    {new Date(origin.updatedAt).toLocaleDateString()}
                  </span>
                </CardContent>
                {SelectedIcon && (
                  <div
                    style={{ backgroundColor: origin.color }}
                    className="absolute top-[-10px] left-[-10px] p-1 rounded-full"
                  >
                    <SelectedIcon className="w-5 h-5 text-secondary" />
                  </div>
                )}
              </Card>
            );
          })}
      </div>
    </div>
  );
}
