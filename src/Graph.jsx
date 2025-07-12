import BarGraph from "./BarGraph.jsx";
import ScatterPlot from "./ScatterPlot.jsx";
import data from "../clusterData.js"

export default function Graph(props)   
{

    let ProjectData = data[7]

    return (
        <div
            className={`graphHolder ${props.smallScreen ? "smallScreen" : ""}`}
        >
            {props.graphType === "BarGraph" && (
                <BarGraph dataRow={props.dataRow}
                    method={props.method}
                    delay={ProjectData[0].endTime/1000000000}           
                />
            )}
            {props.graphType === "ScatterPlot" && (
                <ScatterPlot clusters={props.clusters}
                    ProjectData={ProjectData} 
                />
            )}
        </div>
    );
}