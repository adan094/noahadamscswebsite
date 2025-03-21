// Gets the images for the header of the project page
import StacksList from "../stackslist.js"
import {useState} from "react"

export default function SectionHeader(props)
{



    // Gets the list of images from the StacksList array
    function getImages(imageIDs)
    {
        //mask to keep track of position of each image in the imageIDs array
        let mask = Array(imageIDs.length);
        // Function to select the hovered image and deselect all other images
        function isHovered(status,pid)
        {
            let checkID=-1
           setHovered(hovered=>(hovered.map(element=>{
            checkID++
            if(pid==checkID)
              return status;
            return element;
           })))
        }

        // State to keep track of which image is hovered
        const [hovered, setHovered] = useState(Array(imageIDs.length).fill(false));
        // Position of the image in the imageIDs array
        let pid=-1;
        // Contructs each image from the imageIDs array
        return imageIDs.map((id)=>{
            pid+=1;
            mask[id]=pid;
            // Return the image with the hover effect
            return(
                <div 
                    className="imageLabelContainer"
                    // Set the hover effect
                    onMouseEnter={()=>isHovered(true,mask[id])} 
                    // Remove the hover effect
                    onMouseLeave={()=>isHovered(false,mask[id])} 
                >
                    {/* Set the image */}
                    <img 
                        // Get the image from the StacksList array based upon hover status
                        src={hovered[mask[id]]?StacksList[id].srcHover:StacksList[id].src} 
                        // Set the alt text for the image
                        alt={StacksList[id].alt }
                    />
                    {/* Set the text for the image*/}
                    <h4 style={hovered[mask[id]]?{display: "block"}:{display: "none"}}>{StacksList[id].text}</h4>
                </div>
            )
        })
    }
        
    return(
        <div className="sectionElements">
            <div className="sectionHeader">
                <h2>{props.sectionTitle}</h2>
                <div className="imagesContainer">
                    {/* Get the stacks for the project by position in StacksList array */}
                    {getImages(props.imagesIDs)}
                </div>
                    
            </div>
            {/* Render the section */}
            {props.section}
        </div>
    )
}