import React, {useEffect, useRef} from "react";
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
import { PricingData } from "../utils/types";
import "../styles/LineChart.css";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);


interface ILineChart {
  prices: PricingData[];
  currentSimTime: number;
  setCurrentSimTime: React.Dispatch<React.SetStateAction<number>>;
}

export default function LineChart({prices, currentSimTime, setCurrentSimTime}:ILineChart ){
  const priceArr: number[] = prices.map((price) => price.amount);
  const timeLabels: string[] = prices.map((price) => {
    return new Date(price.valid_from).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  });

  const data: ChartData<"line", number[], unknown> = {
    labels: timeLabels,
    datasets: [
      {
        label: "Energy Costs",
        data: priceArr,
        backgroundColor: "green",
        borderColor: "black",
        pointBorderColor: "black",
        fill: true,
        tension: 0.4,
      }
    ]
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
  return (
    <div className="line-chart-container">
      <Line id="line-chart" data={data} options={options} />
    </div>
  );
};


