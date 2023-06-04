import React, { useState, useEffect } from 'react'

interface IPlayButton {
  currentSimTime: number;
  setCurrentSimTime: React.Dispatch<React.SetStateAction<number>>;
}

export default function PlayButton({ currentSimTime, setCurrentSimTime}:IPlayButton) {
  const [played, setPlayed] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
  
    const incrementSimTime = () => {
      setCurrentSimTime(currentSimTime => currentSimTime + 1);
    };
  
    if (played && currentSimTime <= 48) {
      interval = setInterval(incrementSimTime, 500);
    }
  
    return () => clearInterval(interval);
  
  }, [played, currentSimTime]);  

  function handlePlay() {
    setPlayed(true);
  }

  return (
    <button onClick={handlePlay}>
      Play
    </button>
  )
}