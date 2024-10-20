import { GetStaticProps, InferGetStaticPropsType } from "next";
import RequestBarChart, { MonthlyRequestsCount } from "@/pages/dashboard/widgets/requestBarChart";
import RequestLineChart, { DailyItemCount } from "./widgets/requestLineChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const apiEntry = process.env.NEXT_PUBLIC_API_ENTRYPOINT;

export const getStaticProps = (async () => {
  const [reqRequestBarChartData, reqItemLineChartData] = await Promise.all([
    fetch(`${apiEntry}/requestChart`),
    fetch(`${apiEntry}/dailyItemCounts`),
  ]);

  const [requestBarChartData, itemLineChartData] = await Promise.all([
    reqRequestBarChartData.json(),
    reqItemLineChartData.json(),
  ]);

  return { props: { requestBarChartData, itemLineChartData } };
}) satisfies GetStaticProps<{
  requestBarChartData: MonthlyRequestsCount[]
  itemLineChartData: DailyItemCount[]
}>

export default function Dashboard({ 
  requestBarChartData,
  itemLineChartData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className="min-h-screen flex flex-col items-center center-align justify-center">
      <div className="w-fullmax-w-4xl">
        <RequestBarChart chartData={requestBarChartData}/>
      </div>
      <div className="w-ful max-w-4xl mt-4">
        <RequestLineChart chartData={itemLineChartData} />
      </div>
    </main>
  );
};