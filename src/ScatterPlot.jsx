import Point from "./Point.jsx"
import 'intersection-observer'
import { useState} from "react";
import ExponentialLabel from "./ExponentialLabel.jsx"
import Timing from "./Timing.jsx"


export default function ScatterPlot(props)   
{



    // Get the project data
    let ProjectData=props.ProjectData;
    var maxX = 0;
    var maxY = 0;

    ProjectData.map(data=>{
        if(Math.log10(data.x)>maxX){
            maxX=Math.log10(data.x);
        }
        if(Math.log10(data.y)>maxY){
            maxY=Math.log10(data.y);
        }
    });

    const scaleX = maxX/95;
    const scaleY = maxY/95;

      //animation-class: progress-animation;
      const [animationName, setAnimationName] = useState("blinker");


    const ProjectPoints = ProjectData.map((data)=>{

        return (
          <Point
           x={Math.log10(data.x)/scaleX}
           y={Math.log10(data.y)/scaleY}
           cluster={data.cluster}
           totalClusters={props.clusters}
           keep={data.keep}
           animationName={animationName}
          />
        )
      })


      
    return(<>
                    <div className="graph">
                   { <Timing
                      setAnimationName={setAnimationName}
                      endTime={ProjectData[0].endTime/1000000000/10}
                      scale={1/300}
                      graphType={"ScatterPlot"}
                      delay={0}
                    /> }
                        {ProjectPoints}     
                    </div>
                    <h3 style={{left:"calc(7.5% - 150px)"}}className="verticalLabel">Revenue Generated</h3>
                    {<ExponentialLabel
                      maxRules = {Math.pow(10,maxY)}
                      maxHeight = {327}
                      labelType = {"vertical"}
                    />}
                    {<ExponentialLabel
                      maxRules = {Math.pow(10,maxY)}
                      labelType = {"horizontal"}
                    />}
                    <h3 className="horizontalLabel"
                    >Product Revenue</h3>
            </>
    )
}