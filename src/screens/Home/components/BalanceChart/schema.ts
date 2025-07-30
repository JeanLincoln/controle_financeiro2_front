import { z } from "zod";

export const balanceChartSchema = z.object({
  rangeDate: z.object({
    from: z.date(),
    to: z.date()
  })
});

export type BalanceChartSchema = z.infer<typeof balanceChartSchema>;
