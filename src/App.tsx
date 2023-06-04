import LineChart from "./components/LineChart";
import Navbar from "./components/Navbar";
import JobQueue from "./components/JobQueue";
import { useEffect, useState } from "react";
import { Device, PricingData, QueuedJob } from "./utils/types";
import axios from "axios";
import "./styles/App.css";
import TogglePullOutComponent from "./components/TogglePullOutComponent";
import PullOutComponent from "./components/PullOutComponent";
import PlayButton from "./components/PlayButton";
import { GreenEnergyWidget } from "./components/GreenEnergyWidget";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [pricingData, setPricingData] = useState<PricingData[]>([]);
  const [jobQueue, setJobQueue] = useState<QueuedJob[]>([]);
  
  const [currentSimTime, setCurrentSimTime] = useState<number>(0);
  const [totalGreenHours, setTotalGreenHours] = useState<number>(0);
  const [totalNonGreenHours, setTotalNonGreenHours] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    fetchDeviceData();
    fetchPricingData();
  }, []);

  async function fetchDeviceData() {
    try {
      const response = await axios.get("http://localhost:4000/api/devices");
      setDevices(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchPricingData() {
    try {
      const response = await axios.get("http://localhost:4000/api/prices");
      setPricingData(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="app-container">
      <Navbar />
      <LineChart {line}/>
      <JobQueue devices={devices} prices={pricingData} setJobQueue={setJobQueue} />
      <LineChart 
        prices={pricingData}
        currentSimTime={currentSimTime}
        setCurrentSimTime={setCurrentSimTime}
      />
      <JobQueue devices={devices} prices={pricingData} />
      <PullOutComponent devices={devices} setDevices={setDevices} isOpen={isOpen} />
      <TogglePullOutComponent setIsOpen={setIsOpen} isOpen={isOpen} />
      <GreenEnergyWidget
        currentSimTime={currentSimTime}
        setCurrentSimTime={setCurrentSimTime}
        totalGreenHours={totalGreenHours}
        setTotalGreenHours={setTotalGreenHours}
        totalNonGreenHours={totalNonGreenHours}
        setTotalNonGreenHours={setTotalNonGreenHours}
        totalCost={totalCost}
        setTotalCost={setTotalCost}
      />
    </div>
  );
}

export default App;
