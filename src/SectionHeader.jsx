// Gets the images for the header of the project page
import StacksList from "../stackslist.js"

export default function SectionHeader(props)
{
        // Gets the list of images from the StacksList array
        function getImages(imageIDs)
        {
            // Contructs each image from the imageIDs array
            return imageIDs.map((id)=>{
                return(<img src={StacksList[id].src} alt={StacksList[id].alt}/>)
            })
        }
        
    return(
        <div className="sectionElements">
            <div className="sectionHeader">
                <h2>{props.sectionTitle}</h2>
                <div className="imagesContainer">
                    {/* Get the stacks for the project by position in StacksList array */}
                    {getImages([0,1,2,3,10])}
                </div>
                    
            </div>
            {/* Render the section */}
            {props.section}
        </div>
    )
}