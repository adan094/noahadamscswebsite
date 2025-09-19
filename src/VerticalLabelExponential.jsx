export default function VerticalLabelExponential(props)
{
    
        const labelsDiv = props.labels.map((labelValue) => {
           const shortLabel = props.shortenNumber(labelValue);
            return (   
                <h7 style={{left:`${props.labelMargin(shortLabel)}px`,
                    top:`${props.maxHeight-(Math.log10(labelValue)/Math.log10(props.maxRules))*(props.maxHeight)}px`}}>{shortLabel} -</h7>   
            )
        });

        return(
            <>
                {labelsDiv}
            </>
        )
}