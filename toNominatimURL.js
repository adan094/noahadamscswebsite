

export default function toNominatimURL(address){
    return address.replace(/ /g, '+');
}