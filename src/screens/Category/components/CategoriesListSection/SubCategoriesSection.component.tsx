import { getIconComponent } from "@/components/IconSelector/utils/iconSelector.utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/Popover/Popover.component";
import type { CategoryWithSubCategoriesTags } from "@/store/services/category/categoryService.types";
import { Tags } from "lucide-react";

type SubCategoriesSectionProps = {
  subCategories: CategoryWithSubCategoriesTags["subCategories"];
};

export function SubCategoriesSection({
  subCategories
}: SubCategoriesSectionProps) {
  return (
    <div className="flex gap-1 mt-2">
      {subCategories.slice(0, 2).map((subCategory) => {
        const SelectedIcon = getIconComponent(subCategory.icon);
        return (
          <div
            key={subCategory.id}
            className="flex flex-1 max-w-full items-center gap-2 rounded p-1 py-1.5 text-xs text-primary bg-secondary"
          >
            {SelectedIcon && (
              <SelectedIcon
                className="p-0.5 w-5 h-5 text-secondary rounded-full flex-shrink-0"
                style={{ backgroundColor: subCategory.color }}
              />
            )}
            <span className="line-clamp-1 w-full">{subCategory.name}</span>
          </div>
        );
      })}
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center justify-center bg-background rounded-full p-1 mr-auto cursor-pointer hover:scale-120">
            <Tags className="w-4 h-4 flex-shrink-0" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 max-w-50" align="start">
          <div className="flex flex-wrap gap-1 p-2">
            {subCategories.map((subCategory) => {
              const SelectedIcon = getIconComponent(subCategory.icon);
              return (
                <div
                  key={subCategory.id}
                  className="flex items-center gap-2 p-2 rounded"
                >
                  {SelectedIcon && (
                    <SelectedIcon
                      className="w-5 h-5 text-secondary rounded-full flex-shrink-0 p-0.5"
                      style={{
                        backgroundColor: subCategory.color
                      }}
                    />
                  )}
                  <span className="text-xs line-clamp-1">
                    {subCategory.name}
                  </span>
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
