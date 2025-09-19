import 'intersection-observer'
import { useEffect, useState, useRef } from "react";
import { useIsVisible } from 'react-is-visible'

export default function Timing(props)
{
  //prevents rerenders when the timer is updated
    const nodeRef = useRef();
    //stores and updates timer time, allows any delay to pass before timer is started
    const [count, setCount] = useState(-props.delay);


    //Uses isVisible from intersection observer to check if timer is visible
    const isVisible = useIsVisible(nodeRef);

    //stores the timestamp, in milliseconds, of the last time the timer was updated, useRef used to prevent rerenders
    const lastUpdateTime = useRef(Date.now());
    //stores and updates whether the timer is currectly running
    const [isRunning, setIsRunning] = useState(false);
    //stores whether or not the timer has already been visible
    const [firstTimeVisible, setFirstTimeVisible] = useState(true);
    
  //starts timer and relevant animation, the first time the timer is visible
    useEffect(() => {
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

    //Runs timer after render, passing time per the scale until the end time ahs been reached
     useEffect(()=> {

      let intervalId=0;


        //runs timer while endtime has not been reached
        if (isRunning) {
          //Updates timer, adds seconds passed since last update multiplied by the scale to the timer
          intervalId = setInterval(() => setCount(prevCount => 
            {
                const now = Date.now(); // Gets current time to the millisecond
                const timeElapsed = (now - lastUpdateTime.current)/100; // Tenths of a second elapsed since timer was last updated
                lastUpdateTime.current = now; // Update the last update time
                if(prevCount>=props.endTime) // If the timer has passed the endtime of the animation, stop it
                {
                    setIsRunning(false);
                    return props.endTime;
                }
                //adds seconds passed multiplied by time scale to the time passed
                return prevCount + timeElapsed/props.scale/10;
                }
            ), 100);
            } 
        return () => clearInterval(intervalId) // Clear after unmounting

      //makes sure useEffect is reran whenever the timer is updated
    }, [isRunning])

    //returns JSX timer element, converts timer from seconds to hours, minutes and seconds.
    return(
      <>
        <h2 className = {props.graphType==="ScatterPlot"? "scatterTimer" : "timer"} ref={nodeRef}>{count>3600?`${Math.floor(count/3600)}hrs ${Math.round(count%3600/60)} mins`:count>0?`${Math.round(count/60)} mins`:`0 mins`}</h2>
      </>
    )
}