import * as React from "react";
import { Text,Card } from "@nextui-org/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { setLegendSpacingPlugin, setLegendStyle } from "./config";
import { faker } from '@faker-js/faker'

ChartJS.register(ArcElement, Tooltip, Legend);



// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "2022",
//       data: labels.map(() => faker.datatype.number({ min: 100, max: 500 })),
//       backgroundColor:colors,
//       borderColor: colors,
//     },
//   ],
// };

export interface PieChartProps {
  [x: string]: any;
  // key: any;
  content: React.ReactNode;
}

// export const DataCard: React.FC<DataCardProps> = ({
//   status = "success",
//   title,
//   subText,
//   content,
//   trendText,
// }) =>

export const PieCharts : React.FC<PieChartProps> = (content) => {
  const labels =  [ "desktop", "phone", "tablet"]

  const colors = [ "#14C9C9", "#722ED1", "#9FDB1D"]

  // const dummyData = Object.keys(content).map((key) => [key, content.key]);

  const chartData:any= content.content;

  
  const data = {
      labels,
      datasets: [
        {
          label: "2022",
          data: labels.map((label) => (chartData[label]*100)),
          backgroundColor:colors,
          borderColor: colors,
        },
      ],
    };
  return (
    <Card isHoverable variant="flat" css={{ p: "$6" }}>
      <Card.Header>
      <Text b css={{ lineHeight: "$xm" }}>
              DEVICE DISTRIBUTION
            </Text>
      </Card.Header>
      <Card.Body
        css={{
          py: 0,
        }}
      >
        <Doughnut
          plugins={setLegendSpacingPlugin}
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top" as const,
                align: "start" as const,
                labels: {
                  boxHeight: 9,
                  boxWidth: 9,
                  usePointStyle: true,
                  pointStyle: "rectRounded"
                } as const,
              },
            },
          }}
        />
      </Card.Body>
    </Card>
  );
};
