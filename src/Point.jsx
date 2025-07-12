

export default function Point(props) {

    var y=props.y
    if(y<0)
    {
        y=0;
    }

    return (
        <div
            className="point"
            style={{
                backgroundColor: props.keep ?  "#02dfef" : "#efefef",
                yIndex:-1,
                left: `${props.x}%`,
                bottom: `${y-2}%`,
                animationName: props.keep ? props.animationName : "none",
                animationFillMode: "forwards",
            }}
        ></div>
    );
}