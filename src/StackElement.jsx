

export default function StackElement(props)
{
    return (
        <div className="imageLabelContainer">
          <img src={props.src} alt={props.alt} />
          <p>{props.text}</p>
        </div>
    )
}