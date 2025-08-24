import { Button } from "@/components/Button/Button.component";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/Card/Card.component";
import { ColorPicker } from "@/components/ColorPicker/ColorPicker.component";
import { IconSelector } from "@/components/IconSelector/IconSelector.component";
import { getIconComponent } from "@/components/IconSelector/utils/iconSelector.utils";
import { Input } from "@/components/Input/Input.component";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner.component";
import { Textarea } from "@/components/Textarea/Textarea.component";
import type { CategoryFindByIdResponse } from "@/store/services/category/categoryService.types";
import { FileText, Palette, Pencil, Save, Tags, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../../Form.component";
import { SUB_CATEGORY_ID_FORM_KEY } from "../Category.form";
import { CreatingCategoryState } from "./CreatingCategoryState.component";
import { useHandleDeleteSubCategoryTimeout } from "./hooks/useHandleDeleteSubCategoryTimeout";
import { useSubCategoryForm } from "./hooks/useSubCategoryForm.hook";
import { SubCategoriesEmptyState } from "./SubCategories.empty-state";

export type SubCategorySectionProps = {
  category?: CategoryFindByIdResponse;
};

export function SubCategorySection({ category }: SubCategorySectionProps) {
  const {
    form,
    formState,
    colorWatch,
    isLoading,
    onSubmit,
    handleCreateSubCategoryButton,
    handleAddKey,
    handleDeleteSubCategory,
    isDeleting
  } = useSubCategoryForm({ category });
  const { handleDeleteIconRender } = useHandleDeleteSubCategoryTimeout();

  const renderSubCategoryForm = !isDeleting && !!formState;
  const renderSubCategoriesList =
    !isDeleting && !formState && !!category?.subCategories.length;
  const renderSubCategoriesEmptyState =
    !isDeleting && !formState && !category?.subCategories.length;

  return (
    <Card className=" shrink-0 flex-3 border border-gray-200 p-4 rounded-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 h-full"
        >
          <CardHeader className="p-0">
            <CardTitle>Sub Categorias</CardTitle>
            <CardDescription>
              As sub-categorias que essa categoria possui.
            </CardDescription>
            {category && (
              <CardAction className="mr-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCreateSubCategoryButton}
                >
                  {formState ? (
                    <>
                      <X className="w-4 h-4" />
                      <span>Cancelar</span>
                    </>
                  ) : (
                    <>
                      <Tags className="w-4 h-4" />
                      <span>Criar</span>
                    </>
                  )}
                </Button>
              </CardAction>
            )}
          </CardHeader>
          {!category && <CreatingCategoryState />}
          {category && (
            <CardContent className="flex flex-col gap-4 pl-0">
              {isDeleting && (
                <div className="flex items-center justify-center h-50">
                  <LoadingSpinner variant="orbit" size="lg" />
                </div>
              )}
              {renderSubCategoriesEmptyState && <SubCategoriesEmptyState />}
              {renderSubCategoriesList && (
                <div className="flex flex-wrap w-full gap-4 rounded-lg overflow-y-auto max-h-96 ">
                  {category?.subCategories.map((subCategory) => {
                    const SelectedIcon = getIconComponent(subCategory.icon);
                    return (
                      <div
                        className="flex flex-col gap-2 p-2 rounded bg-secondary w-full max-w-59"
                        key={subCategory.id}
                      >
                        <div className="flex items-center gap-3  justify-between">
                          <div className="flex gap-2 items-center justify-center">
                            {SelectedIcon && (
                              <SelectedIcon
                                className="w-5 h-5 text-secondary rounded-full flex-shrink-0 p-0.5"
                                style={{
                                  backgroundColor: subCategory.color
                                }}
                              />
                            )}
                            <CardTitle
                              className="text-xs line-clamp-1"
                              withTooltip
                            >
                              {subCategory.name}
                            </CardTitle>
                          </div>
                          <div className="flex gap-2 items-center justify-center">
                            <Pencil
                              className="w-3 h-3 shrink-0 transition-all cursor-pointer hover:scale-120 hover:text-blue-500"
                              onClick={() =>
                                handleAddKey({
                                  key: SUB_CATEGORY_ID_FORM_KEY,
                                  value: subCategory.id
                                })
                              }
                            />
                            {handleDeleteIconRender(subCategory.id, () =>
                              handleDeleteSubCategory(
                                category.id,
                                subCategory.id
                              )
                            )}
                          </div>
                        </div>
                        <CardDescription
                          className="text-xs text-gray-500 line-clamp-3"
                          withTooltip
                        >
                          {subCategory.description}
                        </CardDescription>
                      </div>
                    );
                  })}
                </div>
              )}
              {renderSubCategoryForm && (
                <>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Nome
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Nome da Origem"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Descrição
                        </FormLabel>
                        <FormControl>
                          <Textarea {...field} className="resize-none h-30" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex w-full gap-4">
                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="flex items-center gap-2">
                            <Palette className="w-4 h-4" />
                            Cor
                          </FormLabel>
                          <FormControl>
                            <ColorPicker
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="icon"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Ícone
                          </FormLabel>
                          <FormControl>
                            <IconSelector
                              color={colorWatch}
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Selecione um ícone..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="outline"
                    className="flex items-center w-32 gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <LoadingSpinner size="sm" variant="orbit" />
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Salvar
                      </>
                    )}
                  </Button>
                </>
              )}
            </CardContent>
          )}
        </form>
      </Form>
    </Card>
  );
}
