import { Device } from "../utils/types";

interface IDevicesProps {
    devices: Device[];
}

export const Devices = ({ devices }: IDevicesProps) => {
    return (
        <div>
            <h1>Your Devices</h1>
            {devices.map((device) => (
                <div className="device-card" key={device.name}>
                    <h2>{device.name}</h2>
                    <p>Consumption: {device.consumptionPerHour}</p>
                </div>
            ))}    
        </div>
    );
};
