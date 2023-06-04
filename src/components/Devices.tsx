import axios from "axios";
import React, { useState, useEffect } from "react";
import { Device } from "../utils/types";

export const Devices = (devices: Device[]) => {
    return (
        <div>
            <h1>Devices</h1>
            {devices.map((device) => (
                <div className="device-card" key={device.name}>
                    <h2>{device.name}</h2>
                    <p>Consumption: {device.consumptionPerHour}</p>
                </div>
            ))}    
        </div>
    );
};
