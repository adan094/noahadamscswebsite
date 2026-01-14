

export default async function GetPriceofGas (coordinates)
{

    function FetchMedianPrice(listOfCoordinates)
    {
        //Just random data fro the demo
        return Math.random()/2+1;
    }

    const delta=0.015;
    const fromCoordinates=[coordinates[1]-delta,coordinates[0]-delta];
    const ToCoordinates=[coordinates[1]+delta,coordinates[0]+delta];
    //Gets nearest gas stations
        const response = await fetch('https://overpass.kumi.systems/api/interpreter', {
        method: 'POST', 
        headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            'User-Agent': 'https://noahadamscs.com (local testing)'      }
    ,
    body: 'data=[out:json][timeout:25];node["amenity"="fuel"]('+fromCoordinates[0]+','+fromCoordinates[1]+','+ToCoordinates[0]+','+ToCoordinates[1]+');out center;'
        }
        )
            const data = await response.json();
            const elements=data["elements"];
            const stationCoords = elements.map(element=>
            {
                return [element["lat"] , element["lon"]];
            }
            )
            console.log(JSON.stringify(stationCoords));

            if(stationCoords.length==0)
                return FetchMedianPrice(coordinates);

            return FetchMedianPrice(stationCoords);

            //Next each gas station (or the coordinates if no gas stations are returned) from https://rapidapi.com/sogappsllc/api/cheapfuel-price-api and return the average price for economy gas

        return( <h1>gdsgd</h1>
        );
}