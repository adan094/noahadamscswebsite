

export default function StackElement(props)
{
    return (
        <div onClick={function action (){window.open(props.link)}}  onMouseEnter={()=>props.setHovered(true, props.id)} onMouseLeave={()=>props.setHovered(false, props.id)} className="imageLabelContainer">
          <img src={props.isHovered?props.srcHover:props.src} alt={props.alt} />
          <p>{props.text}</p>
        </div>
    )
}