import { useState } from "react";
import LineChart from "./components/LineChart";
import Navbar from "./components/Navbar";
import "./styles/App.css";
import PullOutComponent from "./components/PullOutComponent";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const togglePullOut = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="app-container">
      <Navbar />
      <LineChart />
      <PullOutComponent isOpen={isOpen} />
      <button onClick={togglePullOut}>
        Toggle
      </button>
    </div>
  );
}

export default App;
