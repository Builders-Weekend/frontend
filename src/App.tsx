import { useState } from "react";
import LineChart from "./components/LineChart";
import Navbar from "./components/Navbar";
import { Devices } from "./components/Devices";
import AddDeviceModal from "./components/AddDeviceModal";
import "./styles/App.css";

function App() {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  function handleModalOpen() {
    setModalIsVisible(true);
  }

  return (
    <div className="app-container">
      <Navbar />
      <LineChart />
      <Devices />
      <AddDeviceModal
        modalIsVisible={modalIsVisible}
        setModalIsVisible={setModalIsVisible}
      />
      <button onClick={handleModalOpen}>Add Device</button>
    </div>
  );
}

export default App;
