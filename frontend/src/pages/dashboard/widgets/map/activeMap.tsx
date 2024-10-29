import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useActiveMap } from "@/context/ActiveMapContext";

const defaultColor = "fill-primary";

const getMap = (id: string) => {
  return "grum"
}

const ActiveMap = () => {
  const { activeMap } = useActiveMap();

  return (
    <Card className="m-1 w-full">
      <CardTitle className="text-4xl font-semibold text-center">
        {activeMap.replaceAll('_', ' ')}
      </CardTitle>
      <CardContent className="flex">
        {/* {getMap(activeMap)} */}
      </CardContent>
    </Card>
  );
}

export default ActiveMap