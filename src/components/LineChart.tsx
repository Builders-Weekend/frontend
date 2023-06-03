import React from "react";
import { Line } from "react-chartjs-2";
import { ChartData } from "chart.js";
import "../styles/LineChart.css";

interface ILineChartProps {
  data: ChartData<"line", number[], unknown>;
  options?: any;
}

const LineChart: React.FC<ILineChartProps> = ({ data, options }) => {
  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
