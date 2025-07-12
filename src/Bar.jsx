

export default function Bar(props)
{
    //alert(props.animationPaused);
    return (
        <div 
            style= 
            {{
                marginLeft: `calc(${props.marginLeft} * 1%)`,
                maxHeight: `${props.maxHeight}px`,
                animationDelay : `${props.startTime}s`,
                animationDuration: `${props.duration}s`,
                animationName: props.animationName
            }}
            className="bar"
        >
        </div>
    )
}