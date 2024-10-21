import * as React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface PieChartProps {
  [x: string]: any;
  content: any
}
const options = {
  cutout: '95%',
  plugins: {
    tooltip: { enabled: false },
    legend: { display: false },
  },
};
export const DoughNut: React.FC<PieChartProps> = (doughNut) => {
  const drawCenterText = (chart: { ctx?: any; width?: any; height?: any; }) => {
    const ctx = chart.ctx;
    const { width, height } = chart;
    console.log("chart--", width, height)
    ctx.restore();
    const fontSize = (height / 114).toFixed(2);
    ctx.font = `${fontSize}em Verdana`;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = "#7E868C";
    const centerText = `${doughNut?.content?.doughData[0]}%`;
    // ctx.fillText(centerText, width / 2.9, height / 1.85);
    ctx.fillText(centerText, width / 2.6, height / 1.85);

    ctx.save();
  };
  const data = {
    datasets: [{
      label: doughNut?.content?.label,
      data: doughNut?.content?.doughData,
      backgroundColor: [
        'rgb(54, 162, 235)',
        'rgb(255, 99, 132)'
      ],
      borderColor: [
        'rgb(54, 162, 235)',
        'rgb(255, 99, 132)'
      ],
      hoverOffset: 2
    }]
  };
  return (
    <div style={{ position: 'relative', width: '50%' }}>
      <Doughnut data={data}
        options={options}
        plugins={[{
          beforeDraw: drawCenterText,
          id: ""
        }]}
      />
    </div>
  );
};
