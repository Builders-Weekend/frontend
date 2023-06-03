import { useState } from "react";
import axios from "axios";

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
      <div className="modal-container">
        <div className="modal-content">
          <h1>Add Device</h1>
          <form
            onSubmit={handleSubmit}
            id="add-device-form"
            className="modal-form"
          >
            <label htmlFor="input-name">Name</label>
            <input
              required
              type="text"
              inputMode="text"
              id="input-name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <label htmlFor="input-consumption">Consumption</label>
            <input
              required
              type="number"
              inputMode="numeric"
              id="input-consumption"
              value={formData.consumption}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  consumption: e.target.valueAsNumber,
                })
              }
            />

            <label htmlFor="input-battery">Battery</label>
            <input
              type="checkbox"
              id="input-battery"
              checked={formData.isBattery}
              onChange={(e) =>
                setFormData({ ...formData, isBattery: e.target.checked })
              }
            />

            <label htmlFor="input-charge-level">Charge Level</label>
            <input
              required
              type="number"
              inputMode="numeric"
              id="input-charge-level"
              value={formData.chargeLevel}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  chargeLevel: e.target.valueAsNumber,
                })
              }
            />

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDeviceForm;
