import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartProps {
  moodScore: number;
  anxietyScore: number;
  energyScore: number;
  socialScore: number;
  copingScore: number;
  latestUpdate: string;
}

export const description = "MHA Report";

const chartConfig = {
  desktop: {
    label: "Score",
    color: "#00FFFF",
  },
} satisfies ChartConfig;

export default function ChartReport({
  moodScore,
  anxietyScore,
  energyScore,
  socialScore,
  copingScore,
  latestUpdate,
}: ChartProps) {
  const chartData = [
    { month: "Mood", desktop: moodScore },
    { month: "Anxiety", desktop: anxietyScore },
    { month: "Energy", desktop: energyScore },
    { month: "Social", desktop: socialScore },
    { month: "Coping", desktop: copingScore },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>MENTAL HEALTH REPORT</CardTitle>
        <CardDescription>
          Last Generated At : {latestUpdate?.split("T")[0]}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Generated according to the past user chats{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
