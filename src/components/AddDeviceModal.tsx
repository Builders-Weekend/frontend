import { useState } from "react";
import axios from "axios";
import "../styles/AddDeviceModal.css";

interface IAddDeviceModal {
  modalIsVisible: boolean;
  setModalIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddDeviceModal({
  modalIsVisible,
  setModalIsVisible,
}: IAddDeviceModal) {
  const [name, setName] = useState<string>("");
  const [consumption, setConsumption] = useState<number>(0);
  const [isBattery, setIsBattery] = useState<boolean>(false);
  const [chargeLevel, setChargeLevel] = useState<number>(0);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await axios.post("http://localhost:4000/devices", {
        name: name,
        consumption: consumption,
        isBattery: isBattery,
        chargeLevel: chargeLevel,
      });
      console.log("Form submitted!");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const handleModalClose = () => {
    setModalIsVisible(false);
  };

  return (
    <>
      {modalIsVisible && (
        <div className="container">
          <div className="modal-container">
            <div className="modal-content">
              <h1>Add Device</h1>
              <form onSubmit={handleSubmit} className="modal-form">
                <label htmlFor="input-name">Name</label>
                <input
                  required
                  type="text"
                  inputMode="text"
                  id="input-name"
                  onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="input-consumption">Consumption</label>
                <input
                  required
                  type="number"
                  inputMode="numeric"
                  id="input-consumption"
                  onChange={(e) => setConsumption(e.target.valueAsNumber)}
                />

                <label htmlFor="input-battery">Battery</label>
                <input
                  type="checkbox"
                  id="input-battery"
                  onChange={(e) => setIsBattery(e.target.checked)}
                />

                <label htmlFor="input-charge-level">Charge Level</label>
                <input
                  required
                  type="number"
                  inputMode="numeric"
                  id="input-charge-level"
                  onChange={(e) => setChargeLevel(e.target.valueAsNumber)}
                />

                <input type="submit" value="Submit" />
              </form>
            </div>
            <button onClick={handleModalClose}>Close Modal</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddDeviceModal;
