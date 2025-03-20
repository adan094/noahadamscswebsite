import NHLScorigami from "./NHLScorigami"
import ResearchProject from "./ResearchProject"
import StacksList from "../stackslist.js"

export default function Projects()
{

    /*Gets the list of images from the StacksList*/
    function getImages(imageIDs)
    {
        return imageIDs.map((id)=>{
            return(<img src={StacksList[id].src} alt={StacksList[id].alt}/>)
        })
    }

   return(
    /*Render individual projects*/
    <>
        <NHLScorigami
            images={getImages([0,1,2,3,10])}
        />
       { /*<ResearchProject/>*/}
    </>
   )
}