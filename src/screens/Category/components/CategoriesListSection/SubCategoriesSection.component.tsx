import { Tags } from "lucide-react";

import { getIconComponent } from "@/components/IconSelector/utils/iconSelector.utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/Popover/Popover.component";
import type { CategoryWithSubCategoriesTags } from "@/store/services/category/categoryService.types";

type SubCategoriesSectionProps = {
  subCategories: CategoryWithSubCategoriesTags["subCategories"];
};

export function SubCategoriesSection({
  subCategories
}: SubCategoriesSectionProps) {
  return (
    <div className="mt-2 flex gap-1">
      {subCategories.slice(0, 2).map((subCategory) => {
        const SelectedIcon = getIconComponent(subCategory.icon);
        return (
          <div
            key={subCategory.id}
            className="text-primary bg-secondary flex max-w-full flex-1 items-center gap-2 rounded p-1 py-1.5 text-xs"
          >
            {SelectedIcon && (
              <SelectedIcon
                className="text-secondary h-5 w-5 flex-shrink-0 rounded-full p-0.5"
                style={{ backgroundColor: subCategory.color }}
              />
            )}
            <span className="line-clamp-1 w-full">{subCategory.name}</span>
          </div>
        );
      })}
      {subCategories.length > 2 && (
        <Popover>
          <PopoverTrigger asChild>
            <div className="bg-background mr-auto flex cursor-pointer items-center justify-center rounded-full p-1 hover:scale-120">
              <Tags className="h-4 w-4 flex-shrink-0" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-full max-w-50 p-0" align="start">
            <div className="flex flex-wrap items-center justify-center gap-1 p-2">
              {subCategories.map((subCategory) => {
                const SelectedIcon = getIconComponent(subCategory.icon);
                return (
                  <div
                    key={subCategory.id}
                    className="flex items-center gap-2 rounded p-2"
                  >
                    {SelectedIcon && (
                      <SelectedIcon
                        className="text-secondary h-5 w-5 flex-shrink-0 rounded-full p-0.5"
                        style={{
                          backgroundColor: subCategory.color
                        }}
                      />
                    )}
                    <span className="line-clamp-1 text-xs">
                      {subCategory.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
