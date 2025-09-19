
//Component for each element in the tech stack section
export default function StackElement(props)
{
    return (
      //When clicked, open the link in a new tab. On hover, change the image to the hover image and vice versa when not hovered
      //The id prop is used to identify which element is being hovered over
        <div onClick={function action (){window.open(props.link)}}  onMouseEnter={()=>props.setHovered(true, props.id)} onMouseLeave={()=>props.setHovered(false, props.id)} className="imageLabelContainer">
          <img src={props.isHovered?props.srcHover:props.src} alt={props.alt} />
          <p>{props.text}</p>
        </div>
    )
}