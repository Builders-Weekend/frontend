import React, { useState, useEffect } from 'react'
import { PricingData } from '../utils/types';

interface IPlayButton {
  currentSimTime: number;
  setCurrentSimTime: React.Dispatch<React.SetStateAction<number>>;
  prices: PricingData[];
  pricesArr: number[];
  setPricesArr: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function PlayButton({ currentSimTime, setCurrentSimTime, pricesArr, setPricesArr, prices}:IPlayButton) {
  const [played, setPlayed] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
  
    const incrementSimTime = () => {
      setCurrentSimTime(currentSimTime => currentSimTime + 1);
    };
    const updatePricesArr = () => {
      if(prices && currentSimTime) {
        setPricesArr(pricesArr => [...pricesArr, prices[currentSimTime-1].amount]);
      }
    }
  
    const update = () => {
      incrementSimTime();
      updatePricesArr();
    }
    if (played && currentSimTime <= 48) {
      interval = setInterval(update, 500);
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