import { GetStaticProps, InferGetStaticPropsType } from "next";
import RequestChart from "@/components/ui/requestChart";
import { MonthlyRequestsCount } from "@/components/ui/requestChart";

const apiEntry = process.env.NEXT_PUBLIC_API_ENTRYPOINT;

export const getStaticProps = (async () => {
  const res = await fetch(`${apiEntry}/requestChart`);
  const requestChartData = await res.json();
  return { props: { requestChartData } };
}) satisfies GetStaticProps<{
  requestChartData: MonthlyRequestsCount
}>

export default function Dashboard({ 
  requestChartData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>

    </div>
  );
};