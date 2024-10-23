import React from "react";
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

function formatDate(dateStr: string) {
    const [year, month, day] = dateStr.split('-');
    return `${parseInt(month)}/${parseInt(day)}`;
}

export type DailyItemCount = {
  date: string,
  request_count: number,
  order_count: number
}

const chartConfig = {
  request_count: {
    label: "Requests",
    color: "hsl(var(--chart-1))",
  },
  order_count: {
    label: "Orders",
    color: "hsl(var(--chart-2))"
  }
} satisfies ChartConfig

type RequestLineChartProps = {
  chartData: DailyItemCount[],
}

const RequestLineChart: React.FC<RequestLineChartProps> = ({ chartData }) => {
  return (
    <Card className="m-1 flex w-full box-border">
      {/* <CardHeader className="flex justify-center">
        <CardTitle className="text-center">Daily Counts</CardTitle>
      </CardHeader> */}
      <CardContent className="flex w-full box-border">
        <ChartContainer config={chartConfig} className="flex w-full box-border">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatDate}
              interval="preserveEnd"
              angle={-45}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent/>}
            />
            <Line
              dataKey="request_count"
              type="linear"
              stroke="var(--color-request_count)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="order_count"
              type="linear"
              stroke="var(--color-order_count)"
              strokeWidth={2}
              dot={false}
            />
            {/* <ChartLegend content={<ChartLegendContent />} /> */}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RequestLineChart;