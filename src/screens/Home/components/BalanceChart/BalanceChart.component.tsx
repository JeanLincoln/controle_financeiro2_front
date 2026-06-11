import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/Card/Card.component";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/Chart/Chart.component";
import { RangeDatePicker } from "@/components/DatesPicker/RangeDatePicker/RangeDatePicker.component";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/Form/Form.component";
import { useAppSearchParams } from "@/hooks/useAppSearchParams.hook";
import { useGetTransactionGraphData } from "@/store/requests/dashboard/useGetTransactionGraphData.request";

import { BalanceChartEmptyState } from "./BalanceChart.empty-state";
import {
  balanceChartSchema,
  type BalanceChartSchema
} from "./BalanceChart.schema";
import { BalanceChartSkeleton } from "./BalanceChart.skeleton";
import { TRANSACTION_CHART_CONFIG } from "./constants/chartConfig.constant";
import { handleInitialRangeDate } from "./utils/handleInitialDate.utils";

const { from: defaultFrom, to: defaultTo } = handleInitialRangeDate();

export function BalanceChart() {
  const { handleAddKey } = useAppSearchParams();
  const { graphData, isLoading } = useGetTransactionGraphData();

  const form = useForm<BalanceChartSchema>({
    resolver: zodResolver(balanceChartSchema),
    defaultValues: {
      rangeDate: {
        from: defaultFrom,
        to: defaultTo
      }
    }
  });

  const onSubmit = (data: BalanceChartSchema) => {
    const startDate = data.rangeDate.from.toISOString();
    const endDate = data.rangeDate.to.toISOString();

    handleAddKey({ key: "graphDate", value: `${startDate}_${endDate}` });
  };

  const isEmpty = !isLoading && graphData && !graphData.data.length;
  const isLoaded = !isLoading && graphData && !!graphData.data.length;

  const getYAxisDomain = () => {
    if (!graphData?.data.length) return ["auto", "auto"];

    const allValues = graphData.data.flatMap((item) => [
      item.income || 0,
      item.expense || 0,
      item.balance || 0
    ]);

    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);

    const padding = (maxValue - minValue) * 0.1 || maxValue * 0.1 || 100;

    return [Math.floor(minValue - padding), Math.ceil(maxValue + padding)];
  };

  const formatDateRange = () => {
    const from = form.watch("rangeDate.from");
    const to = form.watch("rangeDate.to");

    if (!from || !to) return "";

    const fromDate = new Date(from).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short"
    });
    const toDate = new Date(to).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    return `${fromDate} - ${toDate}`;
  };

  return (
    <>
      {isLoading && <BalanceChartSkeleton />}
      {!isLoading && (
        <Card className="overflow-hidden">
          <CardHeader className="space-y-0 border-b pb-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <div className="bg-primary/10 rounded-lg p-1.5">
                    <svg
                      className="text-primary h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                      />
                    </svg>
                  </div>
                  Gráfico de transações
                </CardTitle>
                <div className="flex flex-col gap-1">
                  <CardDescription className="text-xs">
                    Visualize entradas, saídas e saldo ao longo do tempo
                  </CardDescription>
                  {formatDateRange() && (
                    <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="font-medium">{formatDateRange()}</span>
                    </div>
                  )}
                </div>
              </div>
              <Form {...form}>
                <FormField
                  control={form.control}
                  name="rangeDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RangeDatePicker
                          rangeDate={field.value}
                          onSelectDate={(value) => {
                            field.onChange(value);
                            form.handleSubmit(onSubmit)();
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Form>
            </div>
          </CardHeader>
          {isEmpty && <BalanceChartEmptyState />}
          {isLoaded && (
            <CardContent className="px-2 pt-6 sm:px-6">
              {!!graphData?.data.length && (
                <ChartContainer
                  config={TRANSACTION_CHART_CONFIG}
                  className="aspect-auto h-[300px] w-full"
                >
                  <LineChart
                    accessibilityLayer
                    data={graphData?.data}
                    margin={{
                      left: 20,
                      right: 20,
                      top: 20,
                      bottom: 20
                    }}
                  >
                    <defs>
                      <linearGradient
                        id="incomeGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--color-income)"
                          stopOpacity={0.1}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-income)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="expenseGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--color-expense)"
                          stopOpacity={0.1}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-expense)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="balanceGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--color-balance)"
                          stopOpacity={0.1}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-balance)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      vertical={false}
                      horizontal={true}
                      strokeDasharray="3 3"
                      stroke="var(--foreground)"
                      opacity={0.2}
                    />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={20}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short"
                        });
                      }}
                      tick={{
                        fontSize: 12,
                        fill: "hsl(var(--muted-foreground))"
                      }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={10}
                      domain={getYAxisDomain()}
                      tick={{
                        fontSize: 12,
                        width: 70,
                        fill: "hsl(var(--muted-foreground))"
                      }}
                      tickFormatter={handleYAxisTickFormatter}
                    />
                    <ChartTooltip
                      cursor={{
                        stroke: "hsl(var(--primary))",
                        strokeWidth: 1,
                        strokeDasharray: "4 4"
                      }}
                      content={<ChartTooltipContent />}
                    />
                    <Line
                      dataKey="income"
                      type="monotone"
                      stroke="var(--color-income)"
                      strokeWidth={3}
                      dot={{
                        fill: "var(--color-income)",
                        strokeWidth: 2,
                        r: 4,
                        fillOpacity: 1
                      }}
                      activeDot={{
                        r: 7,
                        fill: "var(--color-income)",
                        strokeWidth: 2,
                        stroke: "hsl(var(--background))"
                      }}
                    />
                    <Line
                      dataKey="expense"
                      type="monotone"
                      stroke="var(--color-expense)"
                      strokeWidth={3}
                      dot={{
                        fill: "var(--color-expense)",
                        strokeWidth: 2,
                        r: 4,
                        fillOpacity: 1
                      }}
                      activeDot={{
                        r: 7,
                        fill: "var(--color-expense)",
                        strokeWidth: 2,
                        stroke: "hsl(var(--background))"
                      }}
                    />
                    <Line
                      dataKey="balance"
                      type="monotone"
                      stroke="var(--color-balance)"
                      strokeWidth={3}
                      dot={{
                        fill: "var(--color-balance)",
                        strokeWidth: 2,
                        r: 4,
                        fillOpacity: 1
                      }}
                      activeDot={{
                        r: 7,
                        fill: "var(--color-balance)",
                        strokeWidth: 2,
                        stroke: "hsl(var(--background))"
                      }}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                  </LineChart>
                </ChartContainer>
              )}
            </CardContent>
          )}
        </Card>
      )}
    </>
  );
}

const handleYAxisTickFormatter = (value: number) => {
  if (value >= 1000000 || value <= -1000000) {
    return `R$ ${(value / 1000000).toFixed(1)} Milhões`;
  }
  if (value >= 1000 || value <= -1000) {
    return `R$ ${(value / 1000).toFixed(1)} Mil`;
  }
  return `R$ ${value}`;
};
