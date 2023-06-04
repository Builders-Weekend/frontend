import React, { useState } from 'react'
import { Device, QueuedJob, PricingData } from "../utils/types";
import "../styles/JobQueue.css";

interface IJobQueue {
  devices: Device[]
  prices: PricingData[]
}

export default function JobQueue({
  devices,
  prices
}: IJobQueue) {
  const [currentQueue, setCurrentQueue] = useState<QueuedJob[]>([]);
  const [addJob, setAddJob] = useState<boolean>(false);

  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState<string>('');
  const [selectedEndTime, setSelectedEndTime] = useState<string>('');

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const device = devices.find((d) => d.name === event.target.value);
    setSelectedDevice(device || null);
  };

  const handleStartTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStartTime(event.target.value);
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEndTime(event.target.value);
  };

  const handleAddJob = () => {
    setAddJob(!addJob);
  };

  const handleAddJobToQueue = () => {
    if (!selectedDevice || !selectedStartTime || !selectedEndTime) {
      alert('Please select a device, start time, and end time.');
      return;
    }
    // console.log("SELECTED START TIME",  typeof selectedStartTime)
    const startTimeTimeStamp = formatTime(selectedStartTime);
    const endTimeTimeStamp = formatTime(selectedEndTime);
    // console.log(startTimeTimeStamp, endTimeTimeStamp)
    // console.log(typeof startTimeTimeStamp, typeof endTimeTimeStamp)
    const halfHourIncrements = findHalfHourIncrements(startTimeTimeStamp, endTimeTimeStamp);
  
  
    const newJob: QueuedJob = {
      device: selectedDevice,
      start: startTimeTimeStamp,
      end: endTimeTimeStamp,
      cost: calcCost(selectedDevice, prices, halfHourIncrements, startTimeTimeStamp),
    };
    const newQueue = [...currentQueue, newJob];
    // console.log("new queue", newQueue);
    setCurrentQueue(newQueue);
    // console.log("added new queue", currentQueue);
    setAddJob(!addJob);
  };

  const findHalfHourIncrements = (startTime: number, endTime: number) => {
    let hours = (endTime - startTime) / 3600;
    // console.log("found increment")
    return hours * 2;
  };

  const calcCost = (device: Device, prices: PricingData[], halfHourIncrements: number, startTime: number) => {
    const indexOfFirstIncrement: number = prices.findIndex((price: any) => new Date(price.valid_from).getTime() === startTime);
    const pricingArray = prices.slice(indexOfFirstIncrement, indexOfFirstIncrement + (halfHourIncrements - 1));
    let cost = 0;

    for (let item of pricingArray) {
      cost += item.price * (device.consumption / 2);
    };
     console.log("calculated cost", cost);
    return cost;
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

  const convertTimeFromUnixToString = (time: number) => {
    const dateObj: Date = new Date(time * 1000);

    const hours: number = dateObj.getHours();
    const minutes: number = dateObj.getMinutes();

    const formattedTime: string = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  };

  const formatTime = (time: string) => {
    const timestampStr: string = time;
  const currentDate: Date = new Date();
  const currentDateString: string = currentDate.toISOString().slice(0, 10);
  const timestampWithDate: string = `${currentDateString}T${timestampStr}:00`;
  const datetimeObj: Date = new Date(timestampWithDate);

  const unixTimestamp: number = Math.floor(datetimeObj.getTime() / 1000);
  return unixTimestamp;
  };


  return (
    <>
      <div>JobQueue</div>
      {currentQueue.map((job: QueuedJob) => {
        return (
        <div key={job.device.name}>
          <div>{job.device.name}</div>
          <div>{job.start}</div>
          <div>{job.end}</div>
          <div>{job.cost}</div>
          <div>{job.device.chargeLevel ? job.device.chargeLevel : "-"}</div>
        </div>
        )
      })}
      {addJob ? 
        (<form>
          <label>Choose a device</label>
          <select onChange={handleDeviceChange}>
                {devices.map((device: Device) => {
                  return(
                    <option>{device.name}</option>
                  )
                })}
          </select>
          <label>Start Time</label>
          <select onChange={handleStartTimeChange}>
              {prices.map((price: PricingData) => {
                return (
                <option>
                  {extractTimeFromString(price.valid_from)}
                </option>
                )
              })}
          </select>
          <label>End Time</label>
          <select onChange={handleEndTimeChange}>
              {prices.map((price: PricingData) => {
                return (
                <option>
                  {extractTimeFromString(price.valid_to)}
                </option>
                )
              })}
          </select>
          <button onClick={handleAddJobToQueue} type="submit"> Add Job</button>
        </form>)
      : 
        (<div>
          <button onClick={handleAddJob}>Add Device to Queue</button>
        </div>
        )
      }
    </>
  )
}; 