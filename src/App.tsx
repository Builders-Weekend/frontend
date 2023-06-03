import LineChart from "./components/LineChart";
import Navbar from "./components/Navbar";
import { Devices } from "./components/Devices";
import "./styles/App.css";

function App() {
  return (
    <div>
      <Navbar />
      <LineChart />
      <Devices />
    </div>
  );
}

export default App;
