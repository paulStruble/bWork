import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import ModeToggle from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";


type RecentCounterProps = {
  requestCount: number,
  orderCount: number,
}

const RecentCounter = ( { requestCount, orderCount }: RecentCounterProps ) => {
  return (
    <Card className="p-1 m-1 w-full flex flex-col justify-evenly">
      <CardContent className="w-full text-center p-2">
        <div className="text-6xl font-semibold">{requestCount}</div>
        <div className="text-xl font-light text-muted-foreground">Requests</div>
        {/* <div className="text-sm text-gray-400">in the past 90 days</div> */}
      </CardContent>
      <Separator className=""/>
      <CardContent className="w-full text-center p-2">
        <div className="text-6xl font-semibold">{orderCount}</div>
        <div className="text-xl font-light text-muted-foreground">Orders</div>
        {/* <div className="text-sm text-gray-400">in the past 90 days</div> */}
      </CardContent>
    </Card>
  )
}

export default RecentCounter;