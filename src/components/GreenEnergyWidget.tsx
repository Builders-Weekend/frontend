import React, { useState, useEffect } from "react";
import axios from "axios";
import { WeatherApiResponse, Hour, QueuedJob, PricingData } from "../utils/types";
import "../styles/Widget.css";
import PlayButton from "./PlayButton";

interface IGreenEnergyWidget {
    currentSimTime: number;
    setCurrentSimTime: React.Dispatch<React.SetStateAction<number>>;
    // totalGreenHours: number;
    // setTotalGreenHours: React.Dispatch<React.SetStateAction<number>>;
    // totalNonGreenHours: number;
    // setTotalNonGreenHours: React.Dispatch<React.SetStateAction<number>>;
    // totalCost: number;
    // setTotalCost: React.Dispatch<React.SetStateAction<number>>;
    jobQueue: QueuedJob[];
    prices: PricingData[];
    pricesArr: number[];
    setPricesArr: React.Dispatch<React.SetStateAction<number[]>>;
    setJobQueue: React.Dispatch<React.SetStateAction<QueuedJob[]>>;

}

export const GreenEnergyWidget = ({ currentSimTime, setCurrentSimTime, jobQueue, prices, setJobQueue, pricesArr, setPricesArr}: IGreenEnergyWidget) => {
    const [hourlyData, setHourlyData] = useState<Hour[]>([]);
    const isGeneratingArray: boolean[] = [];
    const [totalGreenHours, setTotalGreenHours] = useState<number>(0);
    const [totalNonGreenHours, setTotalNonGreenHours] = useState<number>(0);
    const [totalCost, setTotalCost] = useState<number>(0);

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get<WeatherApiResponse>(`http://localhost:4000/api/forecast/`);
            const forecastHourlyData = response.data.forecast.forecastday[0].hour;
            setHourlyData(forecastHourlyData);
        } catch (error) {
            console.error(error);
        }
    };

    const jobTimeCheck = (jobsList: QueuedJob[], currentSimTime: number, prices: PricingData[]) => {
        // console.log("PRICES OBJECT", prices[currentSimTime - 1]);
        
        const currentPriceTime = extractTimeFromString(prices[currentSimTime - 1].valid_from);
        console.log("JOBS LIST", currentPriceTime);
        if (formatTime(currentPriceTime) === formatTime(jobsList[0].start)) {
            setTotalCost((totalCost) => totalCost + jobsList[0].cost);
            const newJobList = jobsList.slice(1);
            setJobQueue(newJobList);
            const currentWeatherIndex = Math.floor(currentSimTime % 2);
            if (isRenewable(hourlyData[currentWeatherIndex])) {
                setTotalGreenHours((totalGreenHours) => totalGreenHours + 1);
            } else {
                setTotalNonGreenHours((totalNonGreenHours) => totalNonGreenHours + 1);
            }
        }
    }


    // function to control when the light turns on or not - signifying renewable energy is being used.
    const isRenewable = (hourlyData: Hour) => {
        if (hourlyData) {
            if (hourlyData.windKph < 14 || hourlyData.windKph > 90) {
                return true;
            } else if (hourlyData.uvIndex > 2) {
                return true;
            } else {
                return false;
            }
        }
    };

    const formatTime = (time: string) => {
    const timestampStr: string = time;
      const currentDate: Date = new Date("2023-06-02");
      const currentDateString: string = currentDate.toISOString().slice(0, 10);
      const timestampWithDate: string = `${currentDateString}T${timestampStr}:00`;
      const datetimeObj: Date = new Date(timestampWithDate);
    
      const unixTimestamp: number = Math.floor(datetimeObj.getTime() / 1000);
      return unixTimestamp;
    };

    type IsoDateString = string;

    function extractTimeFromString(isoString: IsoDateString): string {
        const date = new Date(isoString);
        const time = date.toLocaleTimeString('en', {
          timeStyle: 'short',
          hour12: false,
          timeZone: 'UTC',
        });
      
        return time;
      }

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

    useEffect(() => {
        if (currentSimTime && jobQueue.length > 0 && prices) {
            jobTimeCheck(jobQueue, currentSimTime, prices);
        }
    }, [currentSimTime]);

    return (
        <div>
            <h1>Green Energy Widget</h1>
            <h2>Total Cost</h2>
            {totalCost}
            <h2>Total Green Hours</h2>
            {totalGreenHours}
            <h2>Total Non Green Hours</h2>
            {totalNonGreenHours}
            {currentSimTime < 48 ? (
                <>
                    <PlayButton 
                        currentSimTime={currentSimTime}
                        setCurrentSimTime={setCurrentSimTime} 
                        pricesArr={pricesArr}
                        setPricesArr={setPricesArr}
                        prices={prices}
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