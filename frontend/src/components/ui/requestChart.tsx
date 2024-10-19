import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export type MonthlyRequestsCount = {
  month_year: string,
  request_count: number;
}

const chartConfig = {
  request_count: {
    label: "Requests",
    color: "#60a5fa",
  },
} satisfies ChartConfig

type RequestChartProps = {
  chartData: MonthlyRequestsCount[],
}

export const RequestChart: React.FC<RequestChartProps> = ({ chartData }) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month_year"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3) + ' ' + value.slice(-2)}
        />
        <Bar dataKey="request_count" fill="var(--color-request_count)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default RequestChart;