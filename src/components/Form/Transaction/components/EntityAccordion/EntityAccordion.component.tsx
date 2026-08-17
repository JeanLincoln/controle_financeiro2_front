import { type ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { Building2, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/Accordion/Accordion.component";
import { Button } from "@/components/Button/Button.component";

import type { TransactionFormSchemaType } from "../../TransactionForm.schema";
import {
  DetailsCard,
  type DetailsCardProps
} from "./components/DetailsCard/DetailsCard.component";

interface EntityAccordionProps {
  title: string;
  entityOptions: Omit<DetailsCardProps, "isSelected" | "onClick">[];
  formFieldName: "originId" | "categoriesIds" | "subCategoriesIds";
  fetchAreaRef: ((node: HTMLDivElement | null) => void) | null;
  disabled?: boolean;
  entityFormSection: ReactNode;
  isEntityFormOpen: boolean;
  setIsEntityFormOpen: () => void;
}

export const EntityAccordion = ({
  title,
  entityOptions,
  formFieldName,
  fetchAreaRef,
  disabled = false,
  entityFormSection,
  isEntityFormOpen = false,
  setIsEntityFormOpen
}: EntityAccordionProps) => {
  const { getValues, setValue } = useFormContext<TransactionFormSchemaType>();

  const validateIfItsSelected = (entityId: number) => {
    const fieldValue = getValues(formFieldName);
    const isMultiSelectField = Array.isArray(fieldValue);

    if (!isMultiSelectField) {
      return fieldValue === entityId;
    }

    return fieldValue.includes(entityId);
  };

  const handleSelectItem = (entityId: number) => {
    const fieldValue = getValues(formFieldName);
    const isMultiSelectField = Array.isArray(fieldValue);

    if (!isMultiSelectField) {
      return fieldValue === entityId
        ? setValue(formFieldName, 0)
        : setValue(formFieldName, entityId);
    }

    return fieldValue.includes(entityId)
      ? setValue(
          formFieldName,
          fieldValue.filter((id) => id !== entityId)
        )
      : setValue(formFieldName, [...fieldValue, entityId]);
  };

  return (
    <AccordionItem className="w-full" value={title} disabled={disabled}>
      <AccordionTrigger>
        <div className="bg-background border-border hover:bg-secondary flex h-16 w-full items-center gap-2 rounded border p-4 no-underline transition-all ease-in-out">
          <Building2 className="h-4 w-4" />
          <span className="no-underline">{title}</span>
          <ChevronDownIcon
            data-slot="accordion-trigger-icon"
            className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
          />
          <ChevronUpIcon
            data-slot="accordion-trigger-icon"
            className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
          />
        </div>
      </AccordionTrigger>
      <AccordionContent className="h-fit p-4 py-1">
        <Button
          type="button"
          variant={isEntityFormOpen ? "destructive" : "outline"}
          className="w-full"
          onClick={() => setIsEntityFormOpen()}
        >
          {isEntityFormOpen ? "Cancelar" : "Criar"}
        </Button>
        <div className="mt-4 flex flex-wrap items-start justify-start gap-6">
          {isEntityFormOpen ? (
            entityFormSection
          ) : (
            <>
              {entityOptions.map((entity) => (
                <DetailsCard
                  key={entity.id}
                  id={entity.id}
                  name={entity.name}
                  description={entity.description}
                  color={entity.color}
                  icon={entity.icon}
                  isSelected={validateIfItsSelected(entity.id)}
                  onClick={() => handleSelectItem(entity.id)}
                />
              ))}
              <div ref={fetchAreaRef} className="h-4 w-full" />
            </>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
