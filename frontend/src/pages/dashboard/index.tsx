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
import { BuildingRequestCount } from "./widgets/map/requestMap";
import RecentCounter from "./widgets/recentCounter";
import RequestMapContainer from "./widgets/map/requestMapContainer";
import MapContainer from "./widgets/map/requestMapContainer";


const apiEntry = process.env.NEXT_PUBLIC_API_ENTRYPOINT;

function formatHotBuildingsData(hotBuildingsData: HotBuildingCount[]) {
  return hotBuildingsData.map((building) => {
    return {
      building: building.building,
      count: building.count, // Convert count to integer
      average_priority: parseFloat(building.average_priority).toFixed(1) // Truncate to 1 decimal
    };
  });
}

export const getStaticProps = (async () => {
  const [
    reqRequestBarChartData,
    reqItemLineChartData,
    reqHotBuildingsDataPre,
    reqBuildingRequestCounts,
    reqRecentRequestCount,
    reqRecentOrderCount
    ] = await Promise.all([
    fetch(`${apiEntry}/requestChart`),
    fetch(`${apiEntry}/dailyItemCounts`),
    fetch(`${apiEntry}/hotBuildingCounts`),
    fetch(`${apiEntry}/buildingRequestCounts`),
    fetch(`${apiEntry}/recentRequestCount`),
    fetch(`${apiEntry}/recentOrderCount`),
  ]);

  const [
    requestBarChartData, 
    itemLineChartData, 
    hotBuildingsDataPre, 
    buildingRequestCounts,
    recentRequestCount,
    recentOrderCount
  ] = await Promise.all([
    reqRequestBarChartData.json(),
    reqItemLineChartData.json(),
    reqHotBuildingsDataPre.json(),
    reqBuildingRequestCounts.json(),
    reqRecentRequestCount.json(),
    reqRecentOrderCount.json(),
  ]);

  const hotBuildingsData = formatHotBuildingsData(hotBuildingsDataPre);

  return { props: { 
    requestBarChartData, 
    itemLineChartData, 
    hotBuildingsData, 
    buildingRequestCounts,
    recentRequestCount,
    recentOrderCount
  } };
}) satisfies GetStaticProps<{
  requestBarChartData: MonthlyRequestsCount[],
  itemLineChartData: DailyItemCount[],
  hotBuildingsData: HotBuildingCount[],
  buildingRequestCounts: BuildingRequestCount[],
  recentRequestCount: number,
  recentOrderCount: number,
}>

export default function Dashboard({ 
  requestBarChartData,
  itemLineChartData,
  hotBuildingsData,
  buildingRequestCounts,
  recentRequestCount,
  recentOrderCount,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className="flex flex-row bg-red-500 h-screen w-screen">
      <div className="flex flex-col justify-between bg-blue-500 h-full">
        <div className="p-0">
          <RecentCounter
            requestCount={recentRequestCount}
            orderCount={recentOrderCount}
          />
        </div>
        <div className="bg-purple-400">
          <HotBuildingsTable tableData={hotBuildingsData}/>
        </div>
      </div>
      <div className="flex flex-col bg-green-500 h-full flex-grow">
        <div className="block w-full">
          <RequestLineChart
          chartData={itemLineChartData}
          />
        </div>
        <div className="bg-yellow-400 flex-grow">
          <RequestMapContainer buildingRequestCounts={buildingRequestCounts}/>
        </div>
      </div>
    </main>
  );
};