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
import ActiveMap from "./widgets/map/activeMap";
import { Sidebar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActiveMapProvider } from "@/context/ActiveMapContext";
import RecentRequestsTable, { RecentRequest } from "./widgets/recentRequests";


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
    reqRecentOrderCount,
    reqRecentBuildingRequests
    ] = await Promise.all([
    fetch(`${apiEntry}/requestChart`),
    fetch(`${apiEntry}/dailyItemCounts`),
    fetch(`${apiEntry}/hotBuildingCounts`),
    fetch(`${apiEntry}/buildingRequestCounts`),
    fetch(`${apiEntry}/recentRequestCount`),
    fetch(`${apiEntry}/recentOrderCount`),
    fetch(`${apiEntry}/recentBuildingRequests`),
  ]);

  const [
    requestBarChartData, 
    itemLineChartData, 
    hotBuildingsDataPre, 
    buildingRequestCounts,
    recentRequestCount,
    recentOrderCount,
    recentBuildingRequests
  ] = await Promise.all([
    reqRequestBarChartData.json(),
    reqItemLineChartData.json(),
    reqHotBuildingsDataPre.json(),
    reqBuildingRequestCounts.json(),
    reqRecentRequestCount.json(),
    reqRecentOrderCount.json(),
    reqRecentBuildingRequests.json(),
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
    recentOrderCount,
    recentBuildingRequests
  } };
}) satisfies GetStaticProps<{
  requestBarChartData: MonthlyRequestsCount[],
  itemLineChartData: DailyItemCount[],
  hotBuildingsData: HotBuildingCount[],
  buildingRequestCounts: BuildingRequestCount[],
  buildingRequestCountsMap: BuildingRequestCountMap,
  recentRequestCount: number,
  recentOrderCount: number,
  recentBuildingRequests: RecentRequest[],
}>

export default function Dashboard({ 
  requestBarChartData,
  itemLineChartData,
  hotBuildingsData,
  buildingRequestCounts,
  buildingRequestCountsMap,
  recentRequestCount,
  recentOrderCount,
  recentBuildingRequests,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { setTheme } = useTheme();

  return (
    // <main className="flex flex-row h-screen w-full p-3 box-border">
    //     <ModeToggle/>
    //   <div className="flex flex-col justify-between max-h-full overflow-clip">
    //     <div className="p-0">
    //       <RecentCounter
    //         requestCount={recentRequestCount}
    //         orderCount={recentOrderCount}
    //       />
    //     </div>
    //     <div className="">
    //       <HotBuildingsTable tableData={hotBuildingsData}/>
    //     </div>
    //   </div>
    //   <div className="flex flex-col h-full flex-grow">
    //     <div className="block w-full">
    //       <RequestLineChart
    //       chartData={itemLineChartData}
    //       />
    //     </div>
    //     <div className="flex-grow">
    //       <RequestMapContainer buildingRequestCountsMap={buildingRequestCountsMap}/>
    //     </div>
    //   </div>
    //   <div className="flex flex-col">
    //     <ActiveMap/>
    //     <HotBuildingsTable tableData={hotBuildingsData}/>
    //   </div>
    // </main>
    <main className="flex flex-row h-screen w-screen box-border overflow-clip">
      <ModeToggle/>
      {/* left content */}
      <div className="flex flex-col w-[15%] h-full">
        {/* top left corner */}
        <div className="flex h-[25%]">
          <RecentCounter
            requestCount={recentRequestCount}
            orderCount={recentOrderCount}
          />
        </div>
        {/* left bar */}
        <div className="flex h-[75%]">
          <HotBuildingsTable
            tableData={hotBuildingsData}
          />
        </div>
      </div>
      {/* center content */}
      <div className="flex flex-col w-[80%] h-full">
        {/* top center bar */}
        <div className="flex h-[25%]">
          <RequestLineChart
            chartData={itemLineChartData}
          />
        </div>
        {/* bottom center content */}
        <div className="flex h-[75%]">
          <MapContainer buildingRequestCountsMap={buildingRequestCountsMap}/>
        </div>
      </div>
      {/* right content */}
      <div className="flex flex-col w-[15%] h-full">
        {/* top right corner */}
        <div className="flex h-[25%]">
          <ActiveMap/>
        </div>
        {/* right bar */}
        <div className="flex h-[75%]">
          <RecentRequestsTable tableData={recentBuildingRequests}/>
        </div>
      </div>
    </main>
  );
};