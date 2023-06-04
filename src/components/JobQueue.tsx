import React, { useState } from 'react'
import { Device, QueuedJob, PricingData } from "../utils/types";
import "../styles/JobQueue.css";

interface IJobQueue {
  devices: Device[]
  prices: PricingData[]
  setJobQueue: React.Dispatch<React.SetStateAction<QueuedJob[]>>
}

export default function JobQueue({
  devices,
  prices,
  setJobQueue
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
    const startTimeTimeStamp = formatTime(selectedStartTime);
    const endTimeTimeStamp = formatTime(selectedEndTime);
    const halfHourIncrements = findHalfHourIncrements(startTimeTimeStamp, endTimeTimeStamp);
  
  
    const newJob: QueuedJob = {
      device: selectedDevice,
      start: convertTimeFromUnixToString(startTimeTimeStamp),
      end: convertTimeFromUnixToString(endTimeTimeStamp),
      cost: calcCost(selectedDevice, prices, halfHourIncrements, startTimeTimeStamp),
    };
    const newQueue = [...currentQueue, newJob];
    setCurrentQueue(newQueue);
    setJobQueue(newQueue);
    setAddJob(!addJob);
  };

  const findHalfHourIncrements = (startTime: number, endTime: number) => {
    let hours = (endTime - startTime) / 3600;
    return hours * 2;
  };

  const calcCost = (device: Device, prices: PricingData[], halfHourIncrements: number, startTime: number) => {
    const newPrices = prices;

    const indexOfFirstIncrement: number = newPrices.findIndex((price: any) => {
      const dateObj: Date = new Date(price.valid_from);
      const unixTimestamp: number = Math.floor(dateObj.getTime() / 1000);

      return unixTimestamp === startTime;
    });
    const pricingArray = newPrices.slice(indexOfFirstIncrement, indexOfFirstIncrement + halfHourIncrements);
    let cost = 0;

    for (let item of pricingArray) {
      cost += item.amount * (device.consumptionPerHour / 2);
    };
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
  const currentDate: Date = new Date("2023-06-02");
  const currentDateString: string = currentDate.toISOString().slice(0, 10);
  const timestampWithDate: string = `${currentDateString}T${timestampStr}:00`;
  const datetimeObj: Date = new Date(timestampWithDate);

  const unixTimestamp: number = Math.floor(datetimeObj.getTime() / 1000);
  return unixTimestamp;
  };


  return (
    <>
    <div className='grid-container'>
      <div className='grid-header' style={{ gridColumn: 1}}>Device</div>
      <div className='grid-header' style={{ gridColumn: 2}}>Start Time</div>
      <div className='grid-header' style={{ gridColumn: 3}}>End Time</div>
      <div className='grid-header' style={{ gridColumn: 4}}>Job Cost</div>
      <div className='grid-header' style={{ gridColumn: 5}}>Device Charge Level</div>
      {currentQueue.map((job: QueuedJob, index: number) => {
        const row = index + 2
        return (
        <div key={job.device.name}>
          <div className='grid-item' style={{ gridRow: row }}>{job.device.name}</div>
          <div className='grid-item' style={{ gridRow: row }}>{job.start}</div>
          <div className='grid-item' style={{ gridRow: row }}>{job.end}</div>
          <div className='grid-item' style={{ gridRow: row }}>{job.cost}</div>
          <div className='grid-item' style={{ gridRow: row }}>{job.device.currentChargeLevel ? job.device.currentChargeLevel : "-"}</div>
        </div>
        )
      })}
    </div>
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