
import prevHistoricData from "./historicData.js"
export default async function Fetch(){


var HistoricData=[...prevHistoricData];

let gameWeek=[];

  let currDate=new Date(Date.now()).toISOString().split("T")[0];
   
   let year=2024;
   let month="12";
   let day="23";

 { 
       
async function getWeek()
{        fetch('https://corsproxy.io/?url=https://api-web.nhle.com/v1/schedule/'+year+'-'+month+'-'+day+'')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let d=[];
            gameWeek=data.gameWeek;
           // alert(year+'-'+month+'-'+day);

            gameWeek.map((week) => {
                
                return (week.games.map((game) => 
                    {
                        if(game.gameState=="OFF"||game.gameState=="FINAL")
                    {                       
                         let winningTeam= game.homeTeam.commonName.default;
                    //    alert(winningTeam)
                    let winningScore= game.homeTeam.score;
                    let losingTeam= game.awayTeam.commonName.default;
                    let losingScore= game.awayTeam.score;
                    
                    if(losingScore >winningScore)
                    {
                        const tempTeam= winningTeam
                        winningTeam=losingTeam
                        losingTeam=tempTeam
                        const tempScore= winningScore
                        winningScore=losingScore
                        losingScore=tempScore
                    }
                    
                    d.push({winningTeam: winningTeam, losingTeam: losingTeam, winningScore: winningScore, losingScore: losingScore, date: game.startTimeUTC})
                }
                }
        
                ))

                
         })

        // alert(d[0].winningTeam+"hhghg");
         let dayAsInt=parseInt(day);
         dayAsInt+=7;
         let monthAsInt=parseInt(month)
         if(dayAsInt>31 && (month=="01"||month=="03"||month=="05"||month=="07"||month=="08"||month=="10"||month=="12"))
         {
             day="0"+(dayAsInt-31);
             monthAsInt++;
             month=""+monthAsInt;
             if(monthAsInt<10)
                 month="0"+monthAsInt;
         }
         else if((month=="04" || month=="06" ||month=="09" || month=="11") && dayAsInt>30)
         {
             day="0"+(dayAsInt-30);
             monthAsInt++;
             month=""+monthAsInt;
             if(monthAsInt<10)
                 month="0"+monthAsInt;
         }
         else if(month=="02" && dayAsInt>28 && year%4!=0)
         {
             day="0"+(dayAsInt-28);
             monthAsInt++;
             month=""+monthAsInt;
             if(monthAsInt<10)
                 month="0"+monthAsInt;
         }
         else if(month=="02" && dayAsInt>29 && year%4==0)
         {
             day="0"+(dayAsInt-29);
             monthAsInt++;
             month=""+monthAsInt;
             if(monthAsInt<10)
                 month="0"+monthAsInt;
         }
         else if(dayAsInt<10)
             day="0"+dayAsInt;
         else
             day=""+dayAsInt;
     
         if(month>12)
         {
             month="01";
             year++;
         }
     
         

         d.map((game)=>{
           
            const id = game.winningScore%16+game.losingScore*17;
            //alert(game.winningScore%16+" "+game.losingScore*16)
            HistoricData[id].timesOcurred=parseInt(HistoricData[id].timesOcurred)+1+"";
            //alert(HistoricData[id].lastWinner + " " + game.winningTeam)
            HistoricData[id].lastWinner=" "+game.winningTeam+" ";
            //alert(HistoricData[id].lastWinner)
           HistoricData[id].lastLoser=" "+game.losingTeam+" ";
            HistoricData[id].lastDate=game.date;
            //alert(HistoricData[id].lastDate)
            //alert(game.date)
        })
        
        
       
        //alert(HistoricData+"sfd")
        
        if(year+'-'+month+'-'+day<currDate)
            getWeek()

        })

        //return HistoricData;
    }
    

       // alert (d+"ffff");
      // (async () => await getWeek())()
getWeek()

   

//alert(d+ "hhggh")
    
return HistoricData;
}





};
