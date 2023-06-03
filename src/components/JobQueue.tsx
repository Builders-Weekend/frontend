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

  const handleAddJob = () => {
    setAddJob(!addJob);
  };

  const handleAddJobToQueue = () => {
    // need something to add the values from drop down to the queue, along with calculate the price and add a - if no battery
  }

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
          <select>
            <div>
                {devices.map((device: Device) => {
                  return(
                    <option>{device.name}</option>
                  )
                })}
            </div>
          </select>
          <label>Start Time</label>
          <select>
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
          <select>
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