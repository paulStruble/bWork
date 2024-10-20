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
import HotBuildingsTable, { HotBuildingCount } from "./widgets/hotBuildings";


const apiEntry = process.env.NEXT_PUBLIC_API_ENTRYPOINT;

function formatHotBuildingsData(hotBuildingsData) {
  return hotBuildingsData.map((building) => {
    return {
      building: building.building,
      count: parseInt(building.count, 10), // Convert count to integer
      average_priority: parseFloat(building.average_priority).toFixed(1) // Truncate to 1 decimal
    };
  });
}

export const getStaticProps = (async () => {
  const [reqRequestBarChartData, reqItemLineChartData, reqHotBuildingsDataPre] = await Promise.all([
    fetch(`${apiEntry}/requestChart`),
    fetch(`${apiEntry}/dailyItemCounts`),
    fetch(`${apiEntry}/hotBuildingCounts`)
  ]);

  const [requestBarChartData, itemLineChartData, hotBuildingsDataPre] = await Promise.all([
    reqRequestBarChartData.json(),
    reqItemLineChartData.json(),
    reqHotBuildingsDataPre.json(),
  ]);

  const hotBuildingsData = formatHotBuildingsData(hotBuildingsDataPre);

  return { props: { requestBarChartData, itemLineChartData, hotBuildingsData } };
}) satisfies GetStaticProps<{
  requestBarChartData: MonthlyRequestsCount[],
  itemLineChartData: DailyItemCount[],
  hotBuildingsData: HotBuildingCount[],
}>

export default function Dashboard({ 
  requestBarChartData,
  itemLineChartData,
  hotBuildingsData
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className="min-h-screen flex flex-col items-center center-align justify-center">
      <div className="w-fullmax-w-4xl">
        <RequestBarChart chartData={requestBarChartData}/>
      </div>
      <div className="w-ful max-w-4xl mt-4">
        <RequestLineChart chartData={itemLineChartData} />
      </div>
      <div>
        <HotBuildingsTable tableData={hotBuildingsData}/>
      </div>
    </main>
  );
};