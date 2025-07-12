export default function horizontalLabelExponential(props)
{

    function offset (shortLabel) 
    {
        if(shortLabel=="10")
            return 1.8;
        return shortLabel.length;
    }
       

        
    var index = 0;

        const labelsDiv = props.labels.map((labelValue) => {
           const shortLabel = props.shortenNumber(labelValue);
           index++;
            return (   
                <>
                    <h7 style={{ visibility: index%2==1 ? "hidden" : "visible",
                        top: "368px",
                        left:`${(Math.log10(labelValue)/Math.log10(props.maxRules))*(84*0.95)+14.5}%`}}>{shortLabel}</h7>
                    <h7 style={{ visibility: index%2==1 ? "hidden" : "visible",
                        top: "354px",
                        left:`${(Math.log10(labelValue)/Math.log10(props.maxRules))*(84*0.95)+14.5+offset(shortLabel)}%`,
                        transform: "rotate(90deg)"}}
                        >-</h7>
                </>   
            )
        });

        return(
            <>
                {labelsDiv}
            </>
        )
}