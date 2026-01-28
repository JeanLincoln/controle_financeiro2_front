export const parseBRLCurrency = (value: string): number => {
  // Remove R$, spaces, and dots (thousand separators)
  // Replace comma with dot for decimal
  const numericValue = value
    .replace(/R\$/g, "")
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  return parseFloat(numericValue) || 0;
};

export const formatToBRLInput = (value: number | string): string => {
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(numValue)) {
    return "R$ 0,00";
  }

  return numValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};
