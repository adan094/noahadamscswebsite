import 'intersection-observer'
import { useEffect, useState, useRef } from "react";
import { useIsVisible } from 'react-is-visible'

export default function Timing(props)
{
    const nodeRef = useRef();
    const [count, setCount] = useState(0);
    const isVisible = useIsVisible(nodeRef);
    const lastUpdateTime = useRef(Date.now());
    const [isRunning, setIsRunning] = useState(false);
    const [firstTimeVisible, setFirstTimeVisible] = useState(true);
    
    useEffect(() => {
    //alert(animationPaused)
        if (isVisible&& firstTimeVisible) {
          setFirstTimeVisible(false);
          lastUpdateTime.current = Date.now();
          if(props.graphType==="BarGraph")
            props.setAnimationName("progress-animation");
          else if(props.graphType==="ScatterPlot")
            props.setAnimationName("blinker");
          setIsRunning(true);
        } 
      }, [isVisible]);
    
    var graphIndex = 0;


     useEffect(()=> {
        let intervalId=0;
        if (isRunning) {
          intervalId = setInterval(() => setCount(prevCount => 
            {
                const now = Date.now();
                const timeElapsed = (now - lastUpdateTime.current)/100; // Time in seconds
                lastUpdateTime.current = now; // Update the last update time
                if(prevCount>=props.endTime)
                {
                    setIsRunning(false);
                    return props.endTime;
                }
               if( props.graphType==="BarGraph"&&prevCount==0&&props.method==="ourMethod")
                 return -props.delay;
                if(prevCount>=props.endTime/10&&props.method==="ourMethod")
                {
                    setIsRunning(false);
                    return props.endTime/10;
                }
                return prevCount + timeElapsed/props.scale/10;
                }
            ), 100);
            } else {
              clearInterval(intervalId)
            }
        return () => clearInterval(intervalId) // Clear after unmounting
    }, [isRunning])

    return(
      <>
        <h2 className = {props.graphType==="ScatterPlot"? "scatterTimer" : "timer"} ref={nodeRef}>{count>3600?`${Math.floor(count/3600)}hrs ${Math.round(count%3600/60)} mins`:count>0?`${Math.round(count/60)} mins`:`0 mins`}</h2>
      </>
    )
    
}