import React, { useState, useEffect } from "react";
import axios from "axios";
import { WeatherApiResponse, Hour } from "../utils/types";
import "../styles/Widget.css";
import PlayButton from "./PlayButton";

interface IGreenEnergyWidget {
    currentSimTime: number;
    setCurrentSimTime: React.Dispatch<React.SetStateAction<number>>;
    totalGreenHours: number;
    setTotalGreenHours: React.Dispatch<React.SetStateAction<number>>;
    totalNonGreenHours: number;
    setTotalNonGreenHours: React.Dispatch<React.SetStateAction<number>>;
    totalCost: number;
    setTotalCost: React.Dispatch<React.SetStateAction<number>>;

}

export const GreenEnergyWidget = ({ currentSimTime, setCurrentSimTime, totalGreenHours, setTotalGreenHours, totalNonGreenHours, setTotalNonGreenHours, totalCost, setTotalCost }: IGreenEnergyWidget) => {
    const [solarGenerating, setSolarGenerating] = useState<boolean>(true);
    const [hourlyData, setHourlyData] = useState<Hour[]>([]);
    const isGeneratingArray: boolean[] = [];

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get<WeatherApiResponse>(`http://localhost:4000/api/forecast/`);
            const forecastHourlyData = response.data.forecast.forecastday[0].hour;
            setHourlyData(forecastHourlyData);
        } catch (error) {
            console.error(error);
        }
    };

    // function to control when the light turns on or not - signifying renewable energy is being used.
    const isRenewable = (hourlyData: Hour) => {
        if (hourlyData) {
            if (hourlyData.windKph < 14 || hourlyData.windKph > 90) {
                isGeneratingArray.push(true);
            } else if (hourlyData.uvIndex > 2) {
                isGeneratingArray.push(true);
            } else {
                isGeneratingArray.push(false);
            }
        }
    };

    const handleReset = () => {
        setCurrentSimTime(0);
    }

    useEffect(() => {
        fetchWeatherData();
        console.log("HOURLY DATA: ", hourlyData);
    }, []);

    useEffect(() => {
        hourlyData.map((hour: Hour) => isRenewable(hour));
        isGeneratingArray.reverse();
        console.log(isGeneratingArray)
    }, [hourlyData]);

    return (
        <div>
            <h1>Green Energy Widget</h1>
            <svg className={solarGenerating ? "sun-logo" : "sun-off-logo"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><g><path d="M25,35c-5.514,0-10-4.486-10-10c0-5.514,4.486-10,10-10c5.514,0,10,4.486,10,10C35,30.514,30.514,35,25,35z"/></g><line fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="25" y1="45" x2="25" y2="39"/><line fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="25" y1="11" x2="25" y2="5"/><line fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="5" y1="25" x2="11" y2="25"/><line fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="39" y1="25" x2="45" y2="25"/><line fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="10.858" y1="39.143" x2="15.101" y2="34.9"/><line fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="34.898" y1="15.102" x2="39.143" y2="10.858"/><line fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="10.858" y1="10.858" x2="15.101" y2="15.102"/><line fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="34.898" y1="34.9" x2="39.143" y2="39.143"/></svg>
            {currentSimTime < 48 ? (
                <>
                    <PlayButton 
                        currentSimTime={currentSimTime}
                        setCurrentSimTime={setCurrentSimTime} 
                    />
                </>
            ) : (
                <>
                    <button onClick={handleReset}>Reset</button>
                </>
            )}
        </div>
    )
    
}