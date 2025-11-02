import prevHistoricData from "./historicData.js"
export default async function Fetch(){



    
var HistoricData=[...prevHistoricData];


 { 
       
async function getWeek()
{       
     const response = await fetch('https://rwwztvngqwunokpnrsbq.supabase.co/rest/v1/NHL_Scorigami?select=*', {
      method: 'GET', // Or POST, PUT, DELETE for other operations
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3d3p0dm5ncXd1bm9rcG5yc2JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTU1OTgsImV4cCI6MjA3NjgzMTU5OH0.PUJxVHjXnUu83tfgGoI4zf9nvkP7o1ohafuWZzUl4vY',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3d3p0dm5ncXd1bm9rcG5yc2JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTU1OTgsImV4cCI6MjA3NjgzMTU5OH0.PUJxVHjXnUu83tfgGoI4zf9nvkP7o1ohafuWZzUl4vY' // For authenticated users, this would be their JWT
      }
    })
    const data = await response.json();

    alert

    data.map((scoreLine => {
        HistoricData[scoreLine.id].timesOcurred=scoreLine.timesOcurred+"";
        HistoricData[scoreLine.id].lastWinner=" "+scoreLine.lastWinner+" ";
        HistoricData[scoreLine.id].lastLoser=" "+scoreLine.lastLoser+" ";
        HistoricData[scoreLine.id].lastDate=scoreLine.lastDate;
        HistoricData[scoreLine.id].gameCenterLink=scoreLine.gameCenterLink;
    }))
         

}
        
       
        //alert(HistoricData+"sfd")

        //return HistoricData;
    
    
getWeek();

   

    
return HistoricData;
}





};
