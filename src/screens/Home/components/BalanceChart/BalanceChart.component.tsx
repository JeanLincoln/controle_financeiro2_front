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
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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

  const onSubmit = async (data: BalanceChartSchema) => {
    const startDate = format(data.rangeDate.from, "yyyy-MM-dd");
    const endDate = format(data.rangeDate.to, "yyyy-MM-dd");

    await handleAddKey({ key: "graphDate", value: `${startDate}_${endDate}` });
  };

  const isEmpty = !isLoading && graphData && !graphData.data.length;
  const isLoaded = !isLoading && graphData && !!graphData.data.length;

  return (
    <>
      {isLoading && <BalanceChartSkeleton />}
      <Card className="pt-0 w-full">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1">
            <CardTitle>Gráfico de transações</CardTitle>
            <CardDescription>
              Mostrando o total de transações por tipo e data
            </CardDescription>
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
        </CardHeader>
        {isEmpty && <BalanceChartEmptyState />}
        {isLoaded && (
          <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            {!!graphData?.data.length && (
              <ChartContainer
                config={TRANSACTION_CHART_CONFIG}
                className="aspect-auto h-[150px] w-full"
              >
                <LineChart
                  accessibilityLayer
                  data={graphData?.data}
                  margin={{
                    left: 12,
                    right: 12
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Line
                    dataKey="income"
                    type="monotone"
                    stroke="var(--color-income)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    dataKey="expense"
                    type="monotone"
                    stroke="var(--color-expense)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    dataKey="balance"
                    type="monotone"
                    stroke="var(--color-balance)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </LineChart>
              </ChartContainer>
            )}
          </CardContent>
        )}
      </Card>
    </>
  );
}
