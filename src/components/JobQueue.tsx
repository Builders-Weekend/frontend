import React, { useState } from 'react'
import { Device, QueuedJob, PricingData } from "../utils/types";
import "../styles/JobQueue.css";
import { start } from 'repl';

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

    const startTimeTimeStamp = new Date(selectedStartTime).getTime();
    const endTimeTimeStamp = new Date(selectedEndTime).getTime();
    const halfHourIncrements = findHalfHourIncrements(startTimeTimeStamp, endTimeTimeStamp);
  
  
    const newJob: QueuedJob = {
      device: selectedDevice,
      start: startTimeTimeStamp,
      end: endTimeTimeStamp,
      cost: calcCost(selectedDevice, prices, halfHourIncrements, startTimeTimeStamp),
    };
  
    setCurrentQueue((currentQueue) => [...currentQueue, newJob]);
  
    setAddJob(!addJob);
  };

  const findHalfHourIncrements = (startTime: number, endTime: number) => {
    let hours = (endTime - startTime) / 3600;
    return hours * 2;
  };

  const calcCost = (device: Device, prices: PricingData[], halfHourIncrements: number, startTime: number) => {
    const indexOfFirstIncrement: number = prices.findIndex((price: any) => new Date(price.valid_from).getTime() === startTime);
    const pricingArray = prices.slice(indexOfFirstIncrement, indexOfFirstIncrement + (halfHourIncrements - 1));
    let cost = 0;

    for (let item of pricingArray) {
      cost += item.price * (device.consumption / 2);
    };

    return cost;
  };

  //for cost we need to take a slice of the prices array, where we work out how many 30 min intervals there are in the hours difference, we then take that number
  // of indexes from the prices array and then use those prices for the cost calculation.

  // const handleAddJobToQueue = () => {
  //   // need something to add the values from drop down to the queue, along with calculate the price and add a - if no battery
  //   // this function also needs to trigger the boolean above to stop rendering the add job stuff and only render the button to toggle it
  // }

  type IsoDateString = string;

  function extractTime(isoString: IsoDateString): string {
    const date = new Date(isoString);
    const time = date.toLocaleTimeString('en', {
      timeStyle: 'short',
      hour12: false,
      timeZone: 'UTC',
    });
  
    return time;
  }

  //need a function to create a new job from the inputs

  return (
    <>
      <div>JobQueue</div>
      {currentQueue.map((job: QueuedJob) => {
        <div key={job.device.name}>
          <div>{job.device.name}</div>
          <div>{job.start}</div>
          <div>{job.end}</div>
          <div>{job.cost}</div>
          <div>{job.device.chargeLevel ? job.device.chargeLevel : "-"}</div>
        </div>
      })}
      {addJob ? 
        <form>
          <label>Choose a device</label>
          <select onChange={handleDeviceChange}>
            <div>
                {devices.map((device: Device) => {
                  return(
                    <option>{device.name}</option>
                  )
                })}
            </div>
          </select>
          <label>Start Time</label>
          <select onChange={handleStartTimeChange}>
            <div>
              {prices.map((price: PricingData) => {
                return (
                <option>
                  {extractTime(price.valid_from)}
                </option>
                )
              })}
            </div>
          </select>
          <select onChange={handleEndTimeChange}>
            <div>
              {prices.map((price: PricingData) => {
                return (
                <option>
                  {extractTime(price.valid_to)}
                </option>
                )
              })}
            </div>
          </select>
          <button onClick={handleAddJobToQueue}> Add Job</button>
        </form>
      : 
        <button onClick={handleAddJob}>Add Device to Queue</button>
      }
    </>
  )
}; 