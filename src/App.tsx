import { useState } from "react";
import LineChart from "./components/LineChart";
import Navbar from "./components/Navbar";
import "./styles/App.css";
import TogglePutOutComponent from "./components/TogglePullOutComponent";
import PullOutComponent from "./components/PullOutComponent";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="app-container">
      <Navbar />
      <LineChart />
      <PullOutComponent isOpen={isOpen} />
      <TogglePutOutComponent setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
}

export default App;
