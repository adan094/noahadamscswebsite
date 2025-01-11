

export default function ContactElement(props)
{


    return (
                <div className="contactContainer" onClick={() => props.action()}  >
                    <img alt={props.alt} onMouseEnter={()=>props.setHovered(true, props.id)} onMouseLeave={()=>props.setHovered(false, props.id)} src={props.isHovered?props.srcHover:props.src}/>
                    <p>{props.text}</p>
                </div> 

    )
}