import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, //x-axis
  LinearScale, //y-axis
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import { ChartData, ChartOptions } from "chart.js";
import "../styles/LineChart.css";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const data: ChartData<"line", number[], unknown> = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Dataset 1",
      data: [0, 10, 5, 2, 20, 30],
      backgroundColor: "aqua",
      borderColor: "black",
      pointBorderColor: "black",
      fill: true,
      tension: 0.4,
    },
  ],
};

const options: ChartOptions<'line'> = {
  responsive: true,
  scales: {
    x: {
      type: 'category',
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Value"
      },
      ticks: {
        stepSize: 1,
      },
    },
  },
};

const LineChart = () => {
  return (
    <div className="line-chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
