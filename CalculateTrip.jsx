import GetCoordinates from "./getCoordinates.js";
import GetPriceofGas from "./src/GetPriceofGas.jsx";

export default async function CalculateTrip(address1, address2, setIsLoading){

    let response, cost;
    try
    {
        const coordinatesFrom = await GetCoordinates(address1)
        const coordinatesTo = await GetCoordinates(address2);
        cost = await GetPriceofGas(coordinatesFrom);
        if(!coordinatesFrom || !coordinatesTo){
            setIsLoading(false);
            alert("One or both addresses could not be found. Please check the addresses and try again.");
            return [null, null];
        }

        response = await fetch('http://router.project-osrm.org/route/v1/driving/'+coordinatesFrom+';'+coordinatesTo, {
        method: 'GET', 
        headers: {
            'User-Agent': 'https://noahadamscs.com (local testing)'      }
        })
    }
    finally
    {
        setIsLoading(false);
    }
    const data = await response.json();



    return [data["routes"][0].distance/1000, data["routes"][0].duration/60, cost];
}