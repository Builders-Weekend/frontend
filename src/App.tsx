import LineChart from "./components/LineChart";
import { Devices } from "./components/Devices";
import { GreenEnergyWidget } from "./components/GreenEnergyWidget";
import "./styles/App.css";

function App() {
  return (
    <div>
      <LineChart />
      <Devices />
      <GreenEnergyWidget />
    </div>
  );
}

export default App;
