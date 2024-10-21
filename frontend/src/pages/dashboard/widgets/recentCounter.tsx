import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";


type RecentCounterProps = {
  requestCount: number,
  orderCount: number,
}

const RecentCounter = ( { requestCount, orderCount }: RecentCounterProps ) => {
  return (
    <>
      <Card className="p-5">
        <CardContent className="w-full text-center align-middle p-3">
          <div className="text-6xl font-extrabold text-black">{requestCount}</div>
          <div className="text-xl font-medium text-gray-600">Requests</div>
          {/* <div className="text-sm text-gray-400">in the past 90 days</div> */}
        </CardContent>
        <Separator/>
        <CardContent className="w-full text-center p-3">
          <div className="text-6xl font-extrabold text-black">{orderCount}</div>
          <div className="text-xl font-medium text-gray-600">Orders</div>
          {/* <div className="text-sm text-gray-400">in the past 90 days</div> */}
        </CardContent>
        <CardFooter className="p-0">
          <div className="p-0 m-auto text-xs text-gray-500">in the last 90 days</div>
        </CardFooter>
      </Card>
    </>
  )
}

export default RecentCounter;