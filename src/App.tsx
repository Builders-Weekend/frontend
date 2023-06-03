import LineChart from "./components/LineChart";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
// import { Devices } from "./components/Devices";
import "./styles/App.css";

function App() {
  const [devices, setDevices] = useState();

  useEffect(() => {

  })

  async function handleDeviceFetch() {
    
  }
  return (
    <div>
      <Navbar />
      <LineChart />
      {/* <Devices /> */}
    </div>
  );
}

export default App;
