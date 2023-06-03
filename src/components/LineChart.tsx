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
  // Time data goes here
  labels: [
    "12:00 AM",
    "01:00 AM",
    "02:00 AM",
    "03:00 AM",
    "04:00 AM",
    "05:00 AM",
    "06:00 AM",
    "07:00 AM",
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
    "11:00 PM",
  ],
  // Energy Usage data goes here
  datasets: [
    {
      label: "Energy Usage",
      // Energy Usage data goes here
      data: [2000, 4000, 6000, 8000, 10000, 2000, 4000],
      backgroundColor: "magenta",
      borderColor: "black",
      pointBorderColor: "black",
      fill: true,
      tension: 0.4,
    },
    {
      label: "Energy Costs",
      // Energy Costs data goes here
      data: [1000, 5000, 2000, 2000, 3000],
      backgroundColor: "green",
      borderColor: "black",
      pointBorderColor: "black",
      fill: true,
      tension: 0.4,
    }
  ],
};

const options: ChartOptions<"line"> = {
  responsive: true,
  scales: {
    x: {
      type: "category",
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Price (JPY)",
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
