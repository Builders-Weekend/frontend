import { useState } from "react";
import axios from "axios";
import "../styles/AddDeviceForm.css";

function AddDeviceForm() {
  const [formData, setFormData] = useState({
    name: "",
    consumption: 0,
    isBattery: false,
    chargeLevel: 0,
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await axios.post("http://localhost:4000/api/devices", formData);
      console.log("Form submitted!");

      setFormData({
        name: "",
        consumption: 0,
        isBattery: false,
        chargeLevel: 0,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <div className="container">
      <div className="form-container">
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
              value={formData.consumption}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  consumption: e.target.valueAsNumber,
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
              <label htmlFor="input-battery">Battery Powered</label>
            </div>

            <label htmlFor="input-charge-level">Charge Level (%)</label>
            <input
              required
              type="number"
              inputMode="numeric"
              className="number-input"
              id="input-charge-level"
              value={formData.chargeLevel}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  chargeLevel: e.target.valueAsNumber,
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
