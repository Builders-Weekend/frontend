import LineChart from "./components/LineChart";

const labels = ["January", "February", "March", "April", "May", "June, July"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [0, 10, 5, 2, 20, 30],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

const options = {
  responsive: true,
  title: {
    display: true,
    text: "My Line Chart",
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Value",
      },
    },
  },
};

function App() {
  return (
    <div className="container">
      <LineChart data={data} options={options}/>
    </div>
  );
}

export default App;
