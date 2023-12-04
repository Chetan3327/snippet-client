import {useEffect, useState} from 'react'

const useAutoIncrementProgress = (increment = 7, interval = 50) => {
    const [progress, setProgress] = useState(0);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setProgress(prevProgress => (prevProgress < 100 ? prevProgress + increment : prevProgress));
      }, interval);
  
      return () => clearInterval(timer);
    }, [increment, interval]);
  
    return progress;
};
 
export default useAutoIncrementProgress