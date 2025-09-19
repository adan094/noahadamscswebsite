
//Component for each element in the contact section
export default function ContactElement(props)
{

    return (
        //When clicked, open the link in a new tab. On hover, change the image to the hover image and vice versa when not hovered
        //The id prop is used to identify which element is being hovered over
        //action is contained in contactslist.js for additional versatility, will need to be considered when refactoring to common component with StackElement
        <div className="contactContainer" onClick={() => props.action()}  onMouseEnter={()=>props.setHovered(true, props.id)} onMouseLeave={()=>props.setHovered(false, props.id)} >
            <img alt={props.alt}  src={props.isHovered?props.srcHover:props.src}/>
            <p>{props.text}</p>
        </div> 

    )
}