import {useState} from "react"

export default function ScorigamiCell(props)
{
    const [mouseOver, setMouseOver] = useState(false)


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

    return (
    <>   
        <td style= {{backgroundColor: props.calcCellColor(props.id), border: mouseOver?  "solid black 3px" : null}}
                onMouseOver={()=>((props.id/props.c)-1>props.id%props.c || props.id==props.c)?null: setMouseOver(true) || props.mouseOver(props.id) }
                onMouseLeave={()=>props.mouseLeave(props.id)|| setMouseOver(false)}>
                {mouseOver&&props.occurrences>0?<div className="popup" style={{left: ((props.id%17)*0.058*window.innerWidth)+450>window.innerWidth-150?-379+"px":null,visibility: window.innerWidth<1000? "hidden":null }}> 
                    {window.innerWidth<1000?props.processBottomInfo(props.occurrences,props.lastWinner,props.id%17,props.lastLoser,Math.floor(props.id/17),timeAgo(props.timeSinceLast)):null}
                    <div>
                        <p > <span style={{fontWeight:"600"}}>{props.occurrences}</span> occurences</p>
                        <p>Last: <span style={{fontWeight:"600"}}>{props.lastWinner} {props.id%17}</span> def <span style={{fontWeight:"600"}}>{props.lastLoser} {Math.floor(props.id/17)}</span> | {timeAgo(props.timeSinceLast)} ago</p>
                    </div>
                </div>:null}
        </td>
        
    </> 
    )
}