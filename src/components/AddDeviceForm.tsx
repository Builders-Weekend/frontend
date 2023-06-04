import { useState } from "react";
import axios from "axios";
import "../styles/AddDeviceForm.css";
import { Device } from "../utils/types";

interface IAddDeviceFormProps {
  devices: Device[];
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
}

function AddDeviceForm({ devices, setDevices }: IAddDeviceFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    consumptionPerHour: 0,
    isBattery: false,
    currentChargeVal: 0,
    maxChargeVal:0
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await axios.post("http://localhost:4000/api/devices", formData);
      console.log("Form submitted!");

      setDevices([...devices, formData]);

      setFormData({
        name: "",
        consumptionPerHour: 0,
        isBattery: false,
        currentChargeVal: 0,
        maxChargeVal:0,
      });

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <div className="container">
      <div className="add-device__form-container">
        <div className="form-content">
          <h1>Add a New Device</h1>
          <form onSubmit={handleSubmit} id="add-device-form" className="form">
            <label htmlFor="input-name">Device Name</label>
            <input
              required
              type="text"
              inputMode="text"
              id="input-name"
              value={formData.name}
              className="text-input"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <label htmlFor="input-consumption">Consumption (kw/h)</label>
            <input
              required
              type="number"
              inputMode="numeric"
              className="number-input"
              id="input-consumption"
              value={formData.consumptionPerHour}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  consumptionPerHour: e.target.valueAsNumber,
                })
              }
            />

            <div className="checkbox-container">
              <input
                type="checkbox"
                id="input-battery"
                checked={formData.isBattery}
                onChange={(e) =>
                  setFormData({ ...formData, isBattery: e.target.checked })
                }
              />
              <label htmlFor="input-battery">Battery?</label>
            </div>

            <label htmlFor="input-charge-level">Max Charge Value (kw)</label>
            <input
              required
              type="number"
              inputMode="numeric"
              className="number-input"
              id="input-charge-level"
              value={formData.maxChargeVal}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maxChargeVal: e.target.valueAsNumber,
                })
              }
            />

            <input type="submit" value="Submit" className="submit-button" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDeviceForm;
