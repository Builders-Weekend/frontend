import { useState } from "react";
import LineChart from "./components/LineChart";
import AddDeviceModal from "./components/AddDeviceModal";
import "./styles/App.css";

function App() {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  function handleModalOpen() {
    setModalIsVisible(true);
  }

  return (
    <div className="app-container">
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
