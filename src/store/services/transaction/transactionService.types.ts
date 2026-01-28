import type {
  Transaction,
  TransactionType
} from "@/entities/transaction.entity";

import type {
  PaginationResponse,
  SortAndPaginationProps
} from "../services.types";

export type TransactionFindAllFilters = {
  name?: string;
};

export const TransactionSortableFields = {
  Nome: "name",
  Descrição: "description",
  Tipo: "type",
  Valor: "amount",
  "Nome de origem": "origin.name",
  "Data da transação": "transactionDate",
  "Criado em": "createdAt",
  "Atualizado em": "updatedAt"
} as const;

export type TransactionSortBy =
  (typeof TransactionSortableFields)[keyof typeof TransactionSortableFields];

export type TransactionFindAllSortAndPaginationProps =
  SortAndPaginationProps<TransactionSortBy>;

export type TransactionFindAllParams =
  TransactionFindAllSortAndPaginationProps & {
    name?: string;
    type?: TransactionType;
    amount?: number;
    transactionDate?: string;
    originId?: number;
    categoriesIds?: number[];
    subCategoriesIds?: number[];
    createdAt?: string;
    updatedAt?: string;
  };

export type DisplayedCategoriesAndSubCategoriesProps = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export type FindAllTransformedTransaction = Transaction & {
  displayedCategoriesAndSubCategories: DisplayedCategoriesAndSubCategoriesProps[];
};

export type TransactionFindAllResponse = PaginationResponse & {
  data: FindAllTransformedTransaction[];
};

export type TransactionFindByIdParams = Pick<Transaction, "id">;
export type TransactionFindByIdResponse = Transaction;

export type CreateTransactionParams = Omit<
  Transaction,
  | "id"
  | "transactionDate"
  | "userId"
  | "origin"
  | "categories"
  | "subCategories"
  | "createdAt"
  | "updatedAt"
> & {
  transactionDate: string;
  originId: number;
  categoriesIds: number[];
  subCategoriesIds: number[];
};

export type UpdateTransactionParams = CreateTransactionParams & {
  id: number;
};

export type DeleteTransactionParams = TransactionFindByIdParams;
