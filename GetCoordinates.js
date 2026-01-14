import toNominatimURL from "./toNominatimURL.js";

export default async function GetCoordinates(address){

    const searchAddress = toNominatimURL(address);

    const response = await fetch('https://nominatim.openstreetmap.org/search?q='+searchAddress+'&format=geojson', {
    method: 'GET', 
    headers: {
        'User-Agent': 'https://noahadamscs.com (local testing)'      }
    })
    
    const data = await response.json();
    if(data["features"].length===0)
        return null;
    return data["features"][0]["geometry"]["coordinates"];

    
}