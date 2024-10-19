import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

type MonthlyRequestsCount = {
  month_year: string,
  request_count: number;
}

const chartConfig = {
  request_count: {
    label: "Requests",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export const getStaticProps = ( async (context) => {
  const res = await fetch('http://localhost:5001/api/requestChart');
  const chartData = await res.json();
  return { props: { chartData } }
}) satisfies GetStaticProps<{
  chartData: MonthlyRequestsCount[]
}>

export default function RequestChart({
  chartData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
}
