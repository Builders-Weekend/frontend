import axios from "axios";
import React, { useState, useEffect } from "react";
import { Device } from "../utils/types";

export const Devices = () => {
    const [devices, setDevices] = useState<Device[]>([]);

    const fetchDeviceData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/devices");
            setDevices(response.data);
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchDeviceData();
    }, []);

    return (
        <div>
            <h1>Devices</h1>
            {devices.map((device) => (
                <div key={device.name}>
                    <h2>{device.name}</h2>
                    <p>Consumption: {device.consumption}</p>
                </div>
            ))}    
        </div>
    );
};
