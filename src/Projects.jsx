import prevHistoricData from "../historicData.js"
import ScorigamiCell from "./ScorigamiCell.jsx"
import HeaderCell from "./HeaderCell.jsx"
import { useState, useEffect } from 'react'
import Fetch from "../Fetch.js"


export default function Projects()
{


   let HistoricData = prevHistoricData

   useEffect(() => {

    (async () => await Fetch())()
    
    }, [HistoricData])

    var maxOccurences=0;

    //alert(HistoricData[0].timesOcurred)

    for (let index = 0; index<200; index++)
    {    
        //alert("hi")
       //alert(HistoricData[index].timesOcurred)
        if(parseInt(HistoricData[index].timesOcurred)>maxOccurences)
        {
            maxOccurences=parseInt(HistoricData[index].timesOcurred);
            
        }
    }

   // alert("hi")

    function calcCellColor(id)
    {
        
        const min =2;
        const max = 210;
        if((id/c)-1>id%c || id==c)
            return "null"
        else if( parseInt(HistoricData[id].timesOcurred)>0)
            return "rgba(" + (max-((max-min)*Math.sqrt(parseInt(HistoricData[id].timesOcurred))/Math.sqrt(maxOccurences))) +", 223, 239, 1)"
        else
            return "white"
    }

    const [occ, setOcc] = useState("");
    const [win, setWin] = useState("");
    const [lose, setLose] = useState("");
    const [wing, setWing] = useState("");
    const [loseg, setLoseg] = useState("");
    const [times, setTimes] = useState("");

    function processBottomInfo(occur,winner,winnerGoals,loser,loserGoals,timeSince)
    {
        setOcc(occur);
        setWin(winner);
        setWing(winnerGoals)
        setLose(loser)
        setLoseg(loserGoals)
        setTimes(timeSince)
    }



    const [bottomBar, setBottomBar] = useState(false)

    var c = 17
    var columnArray = [...Array(c)]

    const[selectedH, setSelectedH] =useState([false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false])
    const[selectedV, setSelectedV] =useState([false,false,false,false,false,false,false,false,false,false])

    var i1 = -1
    const headerArray= selectedH.map((s)=> {
        i1++
        return (
            <HeaderCell key={i1} id={i1} selected={s}/>
        )
    })



    var rowArray= new Array(10).fill(columnArray)
    var i = -1
    const tableArray = selectedV.map(s => {
        var cl = [...Array(c)]
        return ( <tr> 
        {cl.map((element)=> {
            i++
            if(HistoricData[i].timesOcurred>0)
            {
                return (
                    <ScorigamiCell key={HistoricData[i]} calcCellColor=  {calcCellColor} id={i}
                    mouseOver = {mouseOver} mouseLeave = {mouseLeave} occurrences={HistoricData[i].timesOcurred}  c={c} processBottomInfo={processBottomInfo}
                    lastWinner = {HistoricData[i].lastWinner.substring(1,HistoricData[i].lastWinner.length-1)} lastLoser = {HistoricData[i].lastLoser.substring(1,HistoricData[i].lastLoser.length-1)} timeSinceLast= {(Date.now()-(new Date((HistoricData[i].lastDate).trim())).getTime()) / 1000}/>
                )
            }
            else
            {
                return (
                    <ScorigamiCell key={HistoricData[i]} calcCellColor=  {calcCellColor} id={i}
                    mouseOver = {mouseOver} mouseLeave = {mouseLeave} occurrences={HistoricData[i].timesOcurred}  c={c}/>
                )
            }
    })} <HeaderCell key={Math.floor(i/c)} id={Math.floor(i/c)} selected={s}/> </tr>
    )})

    function mouseOver(id)
    {
        let i2=-1
        setSelectedH(arr=>{
            return(
                arr.map((cond)=>{
                    i2++
                    if(id%17==i2)
                        return true
                    return cond
                }
                ))
        })

        let i3=-1
        setSelectedV(arr=>{
            return(
                arr.map((cond)=>{
                    i3++
                    if(Math.floor(id/17)==i3)
                        return true
                    return cond
                }
                ))
        })
        if(window.innerWidth<1000&&HistoricData[id].timesOcurred>0)
            setBottomBar(true)
    }
    function mouseLeave(id)
    {
        let i2=-1
        setSelectedH(arr=>{
            return(
                arr.map((cond)=>{
                    i2++
                    if(id%17==i2)
                        return false
                    return cond
                }
                ))
        })

        let i3=-1
        setSelectedV(arr=>{
            return(
                arr.map((cond)=>{
                    i3++
                    if(Math.floor(id/17)==i3)
                        return false
                    return cond
                }
                ))
        })
        setBottomBar(false)
    }



    return (
            <div className="sectionElements">
                <div >
                    <p>Scorigami is a concept that looks at all the different scores that have occured in a particular league of a particular sport. A scorigami occurs when a scoreline occurs in a sports league that has never occurred before. <a href="https://en.wikipedia.org/wiki/Jon_Bois">Jon Bois</a>, a Sports Writer coined the term and populariized it in a <a href="https://www.youtube.com/watch?v=9l5C8cGMueY">2016 YouTube video by Secret Base</a>. The video analyzed the NFL, whose <a href="https://nflscorigami.com/">scoragami table</a> is particularly interesting due to the NFLs janky scoring increments with large deviations in rarity.</p>
                    <p>I have constructed a self-updating scorigami table for the NHL below which contains all scores that have ever occured in the league. It contains information on each scoreline, including the number of times it has happened and what game it last happened in. The table is <a href="https://en.wikipedia.org/wiki/Heat_map">heatmapped</a>, where darker shades represent more occurences and lighter sahdes represents less, with white representing none. The columns represent the winning teams goal's and the rows represent the losing team's goals. The axis only goes to 16 goals for the winning team and 9 for the losing team as these are the records for most goals in a win and loss respectively. As of creating this chart in January 2025, no scorigamis have occured since ties were abolished following the 2003-04 season. This is primarily due to the fact that scoring has dropped within the NHL and teams have gotten closer in skill due to the introduction of the <a href="https://en.wikipedia.org/wiki/NHL_salary_cap">Salary Cap</a>. In order for a scoragami to occur, the winning team must score at least 11 goals, which has only happened <a href="https://www.nhl.com/gamecenter/det-vs-pit/2022/03/27/2021021050">once</a> since the salary cap was introduced for the 2005-06 season.</p>
                    <p>This table is generated using a mix of pre gathered NHL API data written to a file in order to keep load times short as well as live NHL API retireival to keep it up to date.</p>
                </div>
                <table>
                    <tr>
                        {headerArray}
                        <th></th>
                    </tr>
                    {tableArray}

                    <div>

                    </div>
                </table>
                <div className="bottomInfo" style={{visibility:bottomBar?"visible":"hidden"}}>
                    <p > <span style={{fontWeight:"600"}}></span>{occ} occurences</p>
                    <p>Last: <span style={{fontWeight:"600"}}>{win}</span> {wing} def <span style={{fontWeight:"600"}}>{lose}</span> {loseg} | {times} ago</p>
                </div>
            </div>
    )
}