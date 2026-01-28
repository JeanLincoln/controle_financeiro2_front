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
import { CATEGORY_ID_FORM_KEY } from "@/components/Form/Category/Category.form";
import { getIconComponent } from "@/components/IconSelector/utils/iconSelector.utils";
import { useAppSearchParams } from "@/hooks/useAppSearchParams.hook";
import type { CategoryFindAllResponse } from "@/store/services/category/categoryService.types";

import { CategoriesListSectionSkeleton } from "./CategoriesListSectionSkeleton.skeleton";
import { SubCategoriesSection } from "./SubCategoriesSection.component";

type CategoriesListSectionProps = {
  categories?: CategoryFindAllResponse["data"];
  loading: boolean;
};

export function CategoriesListSection({
  categories,
  loading
}: CategoriesListSectionProps) {
  const { handleAddKey } = useAppSearchParams();

  const dataIsLoaded = !loading && categories && categories.length > 0;
  return (
    <div className="flex h-[512px] flex-col justify-between">
      {loading && <CategoriesListSectionSkeleton />}
      <div className="flex w-full flex-wrap gap-4">
        {dataIsLoaded &&
          categories.map((category) => {
            const SelectedIcon = getIconComponent(category.icon);

            return (
              <Card
                className="relative h-45 w-full max-w-74 gap-3"
                key={category.id}
              >
                <CardHeader>
                  <CardTitle className="line-clamp-1" withTooltip>
                    {category.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-1" withTooltip>
                    {category.description || "Sem descrição"}
                  </CardDescription>
                  <CardAction className="flex flex-col items-center gap-4">
                    <AlertDialogTrigger asChild>
                      <Trash
                        className="h-4 w-4 cursor-pointer text-red-500 transition-all hover:scale-120"
                        onClick={() =>
                          handleAddKey({
                            key: CATEGORY_ID_FORM_KEY,
                            value: category.id
                          })
                        }
                      />
                    </AlertDialogTrigger>
                    <DrawerTrigger asChild>
                      <Pencil
                        className="h-4 w-4 cursor-pointer text-blue-500 transition-all hover:scale-120"
                        onClick={() =>
                          handleAddKey({
                            key: CATEGORY_ID_FORM_KEY,
                            value: category.id
                          })
                        }
                      />
                    </DrawerTrigger>
                  </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-sm">
                    <b>Criado Em:</b>{" "}
                    {new Date(category.createdAt).toLocaleDateString()}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    <b>Atualizado Em:</b>{" "}
                    {new Date(category.updatedAt).toLocaleDateString()}
                  </span>
                  <SubCategoriesSection
                    subCategories={category.subCategories}
                  />
                </CardContent>
                {SelectedIcon && (
                  <div
                    style={{ backgroundColor: category.color }}
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
