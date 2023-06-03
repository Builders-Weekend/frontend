
import LineChart from "./components/LineChart";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import "./styles/App.css";
import { Devices } from "./components/Devices";
import AddDeviceModal from "./components/AddDeviceModal";

function App() {
  const [devices, setDevices] = useState();
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  useEffect(() => {

  })

  async function handleDeviceFetch() {
    
  }

  function handleModalOpen() {
    setModalIsVisible(true);
  }

  return (
    <div className="app-container">
      <Navbar />
      <LineChart />
      <AddDeviceModal
        modalIsVisible={modalIsVisible}
        setModalIsVisible={setModalIsVisible}
      />
      <button onClick={handleModalOpen}>Add Device</button>
    </div>
  );
}

export default App;
