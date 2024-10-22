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
import RequestMapContainer, { BuildingRequestCountMap } from "./widgets/map/requestMapContainer";
import MapContainer from "./widgets/map/requestMapContainer";
import ModeToggle from "@/components/ui/mode-toggle";
import { useTheme } from "next-themes";


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
  const buildingRequestCountsMap = buildingRequestCounts.reduce((map, obj) => {
      map[obj.building] = obj.count;
      return map;
  }, {});

  return { props: { 
    requestBarChartData, 
    itemLineChartData, 
    hotBuildingsData, 
    buildingRequestCounts,
    buildingRequestCountsMap,
    recentRequestCount,
    recentOrderCount
  } };
}) satisfies GetStaticProps<{
  requestBarChartData: MonthlyRequestsCount[],
  itemLineChartData: DailyItemCount[],
  hotBuildingsData: HotBuildingCount[],
  buildingRequestCounts: BuildingRequestCount[],
  buildingRequestCountsMap: BuildingRequestCountMap,
  recentRequestCount: number,
  recentOrderCount: number,
}>

export default function Dashboard({ 
  requestBarChartData,
  itemLineChartData,
  hotBuildingsData,
  buildingRequestCounts,
  buildingRequestCountsMap,
  recentRequestCount,
  recentOrderCount,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { setTheme } = useTheme();

  return (
    <main className="flex flex-row h-screen w-full p-3 box-border">
      <ModeToggle/>
      <div className="flex flex-col justify-between max-h-full overflow-clip">
        <div className="p-0">
          <RecentCounter
            requestCount={recentRequestCount}
            orderCount={recentOrderCount}
          />
        </div>
        <div className="">
          <HotBuildingsTable tableData={hotBuildingsData}/>
        </div>
      </div>
      <div className="flex flex-col h-full flex-grow">
        <div className="block w-full">
          <RequestLineChart
          chartData={itemLineChartData}
          />
        </div>
        <div className="flex-grow">
          <RequestMapContainer buildingRequestCountsMap={buildingRequestCountsMap}/>
        </div>
      </div>
    </main>
  );
};