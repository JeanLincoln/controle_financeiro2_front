import { Pencil, Trash } from "lucide-react";

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
import { useAppSearchParams } from "@/hooks/useAppSearchParams.hook";
import type { OriginFindAllResponse } from "@/store/services/origin/originService.types";

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
    <div className="flex h-[512px] flex-col justify-between">
      {loading && <OriginsListSectionSkeleton />}
      <div className="flex w-full flex-wrap gap-4">
        {dataIsLoaded &&
          origins.map((origin) => {
            const SelectedIcon = getIconComponent(origin.icon);

            return (
              <Card
                className="relative h-35 w-full max-w-74 gap-3"
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
                        className="h-4 w-4 cursor-pointer text-red-500 transition-all hover:scale-120"
                        onClick={() =>
                          handleAddKey({ key: "id", value: origin.id })
                        }
                      />
                    </AlertDialogTrigger>
                    <DrawerTrigger asChild>
                      <Pencil
                        className="h-4 w-4 cursor-pointer text-blue-500 transition-all hover:scale-120"
                        onClick={() =>
                          handleAddKey({ key: "id", value: origin.id })
                        }
                      />
                    </DrawerTrigger>
                  </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-sm">
                    <b>Criado Em:</b>{" "}
                    {new Date(origin.createdAt).toLocaleDateString()}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    <b>Atualizado Em:</b>{" "}
                    {new Date(origin.updatedAt).toLocaleDateString()}
                  </span>
                </CardContent>
                {SelectedIcon && (
                  <div
                    style={{ backgroundColor: origin.color }}
                    className="absolute top-[-10px] left-[-10px] rounded-full p-1"
                  >
                    <SelectedIcon className="text-secondary h-5 w-5" />
                  </div>
                )}
              </Card>
            );
          })}
      </div>
    </div>
  );
}
