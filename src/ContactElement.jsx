

export default function ContactElement(props)
{


    return (
                <div className="contactContainer" onClick={() => props.action()}  onMouseEnter={()=>props.setHovered(true, props.id)} onMouseLeave={()=>props.setHovered(false, props.id)} >
                    <img alt={props.alt}  src={props.isHovered?props.srcHover:props.src}/>
                    <p>{props.text}</p>
                </div> 

    )
}