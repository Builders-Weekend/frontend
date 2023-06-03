import React, { useState } from 'react'
import { Device, QueuedJob } from "../utils/types";
import "../styles/JobQueue.css";

export default function JobQueue(devices: Device[]) {
  const [currentQueue, setCurrentQueue] = useState<QueuedJob[]>([]);

  return (
    <>
      <div>JobQueue</div>
    </>
  )
}; 