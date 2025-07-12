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
    const maxRules = ProjectData[0].rules;//

    const maxHeight = 350;
    const scale= 1/300;

      //animation-class: progress-animation;
      const [animationName, setAnimationName] = useState("");


      var delay = props.delay*scale/10;
      var durationModifier = 10;
      if(props.method==="previousMethod")
      {
        delay = 0;
        durationModifier = 1;
      }
    

    const ProjectBars = ProjectData.map((data)=>{
        return (
          <Bar
            key={data.products}
            products={data.products}
            marginLeft={4.7+10.7*(data.products-2)}
            startTime={(data.startTime*scale/1000)/durationModifier+delay}
            duration={(data.endTime-data.startTime)*scale/1000/durationModifier}
            maxHeight={data.rules/maxRules*maxHeight}
            animationName={animationName}
          />
        )
      })




    return(<>

                    <div className="graph">
                    <Timing
                      setAnimationName={setAnimationName}
                      endTime={ProjectData[ProjectData.length-1].endTime/1000}
                      scale={scale}
                      graphType={"BarGraph"}
                      delay={props.delay/10}
                      method={props.method}
                    />
                        {ProjectBars}     
                    </div>
                    <h3 className="verticalLabel">Rules Mined</h3>
                    <VerticalLabel
                      maxRules = {maxRules}
                      maxHeight = {maxHeight}
                    />
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