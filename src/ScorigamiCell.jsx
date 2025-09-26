import {useState} from "react"

//Component representing a single cell in the Scorigami table
export default function ScorigamiCell(props)
{
    //State variable to track if the cell is being hovered over
    const [mouseOver, setMouseOver] = useState(false)

    //Function to convert time in seconds to a more human readable format
    function timeAgo(time)
    {
        if(time < 60)
            return Math.floor(time) + " sec"
        time/=60;
        if(time < 60)
            return Math.floor(time) + " min"
        time/=60;
        if(time < 24)
            return Math.floor(time) + " hrs"
        time/=24;
        if(time<366)
            return Math.floor(time) + " days"
        return Math.floor(time /365.24) + " yrs"
    }

    const lastOccurence = <p>Last: <span style={{fontWeight:"600"}}>{props.lastWinner} {props.id%17}</span> def <span style={{fontWeight:"600"}}>{props.lastLoser} {Math.floor(props.id/17)}</span> | {timeAgo(props.timeSinceLast)} ago</p>

    //Render the cell, changing its border when hovered over and displaying a popup with more information if it has occurred at least once
    return (
    <>   
        <td style= {{backgroundColor: props.calcCellColor(props.id), border: mouseOver?  "solid black 3px" : null}}
            // Only show popup if the score is valid (i.e. the winning score is greater than or equal to the losing score), this only occurs on the diagonal and above
            onMouseOver={()=>((props.id/props.c)-1>props.id%props.c || props.id==props.c)?null: setMouseOver(true)  }
            onMouseLeave={()=>props.mouseLeave(props.id)|| setMouseOver(false)}>
                    
            {/* Only show popup if the score has occured before */}
            {mouseOver&&props.occurrences>0?
                <div className="popup" style={{left: ((props.id%17)*0.058*window.innerWidth)+450>window.innerWidth-150?-379+"px":null,visibility: window.innerWidth<1000? "hidden":null }}> 
                   
                    {/* Only show bottom info bar on mobile if the score has occured before */}
                    {window.innerWidth<1000?props.processBottomInfo(props.occurrences,props.lastWinner,props.id%17,props.lastLoser,Math.floor(props.id/17),timeAgo(props.timeSinceLast)):null}
                    
                    {/* Display the information about the score */}
                    <div>
                        <p > <span style={{fontWeight:"600"}}>{props.occurrences}</span> occurences</p>
                        {props.gameCenterLink!=null? <a  href={props.gameCenterLink}> {lastOccurence} </a> : lastOccurence}
                    </div>
                </div>
            :null}
        </td>
        
    </> 
    )
}