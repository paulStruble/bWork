import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type MonthlyRequestsCount = {
  month_year: string,
  request_count: number,
}

const chartConfig = {
  request_count: {
    label: "Requests",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

type RequestBarChartProps = {
  chartData: MonthlyRequestsCount[],
}

const RequestBarChart: React.FC<RequestBarChartProps> = ({ chartData }) => {
  return (
    <Card>
      <CardHeader className="flex justify-center">
        <CardTitle className="text-center">Monthly Request Counts</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
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
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="request_count" fill="var(--color-request_count)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RequestBarChart;