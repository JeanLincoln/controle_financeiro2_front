import type { Category } from "@/entities/category.entity";
import type { Origin } from "@/entities/origin.entity";
import type { SubCategory } from "@/entities/subCategory.entity";
import type { Transaction } from "@/entities/transaction.entity";

import {
  RelationSummaryRow,
  type RelationOption
} from "./components/RelationSummaryRow/RelationSummaryRow.component";

type TransactionRelationsSummaryProps = {
  transaction?: Transaction;
  originId: number;
  categoryIds: number[];
  subCategoryIds: number[];
  origins: Origin[];
  categories: Category[];
  subCategories: SubCategory[];
};

export function TransactionRelationsSummary({
  transaction,
  originId,
  categoryIds,
  subCategoryIds,
  origins,
  categories,
  subCategories
}: TransactionRelationsSummaryProps) {
  const selectedOrigin = getSelectedRelations(
    originId ? [originId] : [],
    origins,
    transaction?.origin ? [transaction.origin] : []
  );
  const selectedCategories = getSelectedRelations(
    categoryIds,
    categories,
    transaction?.categories ?? []
  );
  const selectedSubCategories = getSelectedRelations(
    subCategoryIds,
    subCategories,
    transaction?.subCategories ?? []
  );

  return (
    <section
      aria-labelledby="transaction-relations-summary-title"
      className="bg-muted/30 space-y-3 rounded-lg border p-4"
    >
      <div>
        <h3
          id="transaction-relations-summary-title"
          className="text-sm font-semibold"
        >
          Relações da transação
        </h3>
        <p className="text-muted-foreground text-xs">
          Origem, categorias e subcategorias selecionadas.
        </p>
      </div>
      <div className="space-y-2">
        <RelationSummaryRow title="Origem" relations={selectedOrigin} />
        <RelationSummaryRow title="Categorias" relations={selectedCategories} />
        <RelationSummaryRow
          title="Subcategorias"
          relations={selectedSubCategories}
        />
      </div>
    </section>
  );
}

function getSelectedRelations(
  relationIds: number[],
  availableRelations: RelationOption[],
  fallbackRelations: RelationOption[]
) {
  const relationsById = new Map(
    [...fallbackRelations, ...availableRelations].map((relation) => [
      relation.id,
      relation
    ])
  );

  return relationIds.flatMap((relationId) => {
    const relation = relationsById.get(relationId);

    return relation ? [relation] : [];
  });
}
