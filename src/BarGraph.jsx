import data from "../researchProjectData.js"
import Bar from "./Bar.jsx"
import 'intersection-observer'
import { useState} from "react";
import VerticalLabel from "./VerticalLabel.jsx"
import Timing from "./Timing.jsx"


export default function BarGraph(props)   
{

  // Get the project data
  let ProjectData=data[props.dataRow];
  const maxRules = ProjectData[0].rules;

  //max height of the graph in px
  //max rules is the max number of rules mined in the data set
  //so each bar's height is (rules/maxRules)*maxHeight
  const maxHeight = 350;
  //scaling factor for the timing of the animation (real time seconds / expirement seconds)
  const scale= 1/300;

  //Converts delay from ms to seconds, and modifies duration based on method
  var delay = props.delay/1000;
  //Our method is 10x faster than previous method, so we need to modify end time accordingly
  var durationModifier = 10;
  if(props.method=="previousMethod")
  {
    delay = 0;
    durationModifier = 1;
  }
    
  //Holds animation name for bars which is set by Timing component, so that the animation can be started when the component is visible
  const [animationName, setAnimationName] = useState("");

  //maps the project data to Bar components
  const ProjectBars = ProjectData.map((data)=>{
    return (
      <Bar
        key={data.products}
        products={data.products}
        //margin left is 4.7% + 10.7% for each additional product (2 products starts at 4.7%, 3 at 15.4%, etc)
        marginLeft={4.7+10.7*(data.products-2)}
        //start time is start time of the data point, scaled and modified for duration, plus any delay
        startTime={(data.startTime*scale/1000)/durationModifier+delay*scale}
        //duration is the duration of the data point, scaled and modified for duration
        duration={(data.endTime-data.startTime)*scale/1000/durationModifier}
        //max height is the height of the bar when the animation is compelte, it is based on the number of rules mined
        maxHeight={data.rules/maxRules*maxHeight}
        //animation name is set by the timing component when the timer is visible
        animationName={animationName}
      />
    )
  })

  return(
    <>

      {/*Holder for the graph and the timer*/}
      <div className="graph">
        {/* Timing component which handles the timer and starting the animation when the graph is visible */}
        <Timing
          setAnimationName={setAnimationName}
          // /1000 to convert from ms to s
          endTime={ProjectData[ProjectData.length-1].endTime/1000/durationModifier}
          scale={scale}
          graphType={"BarGraph"}
          delay={delay}
        />
        {/* The bars of the graph*/}
        {ProjectBars}     
      </div>
    
      <h3 className="verticalLabel">Rules Mined</h3>
        <VerticalLabel
          maxRules = {maxRules}
          maxHeight = {maxHeight}
        />
        
        {/* The labels along the bottom of the graph, each is seperated by 9% of the screen width */}
        <h7 style={{left:"calc(20.5% + 1px)"}}>2</h7>
        <h7 style={{left:"calc(29.5% + 1px)"}}>3</h7>
        <h7 style={{left:"calc(38.5% + 1px)"}}>4</h7>
        <h7 style={{left:"calc(47.5% + 1px)"}}>5</h7>
        <h7 style={{left:"calc(56.5% + 1px)"}}>6</h7>
        <h7 style={{left:"calc(65.5% + 1px)"}}>7</h7>
        <h7 style={{left:"calc(74.5% + 1px)"}}>8</h7>
        <h7 style={{left:"calc(83.5% + 1px)"}}>9</h7>
        <h7 style={{left:"calc(91.5% + 1px)"}}>10</h7>
        <h3 className="horizontalLabel">Products per Rule</h3>
      </>
    )
}