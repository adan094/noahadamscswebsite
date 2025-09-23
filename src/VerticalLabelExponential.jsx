
//Component which generates vertical axis labels for the graph, using an exponential scale
export default function VerticalLabelExponential(props)
{
    
    //creates array of labels, each being a power of 10, up to maxLabel
        const labelsDiv = props.labels.map((labelValue) => {
           const shortLabel = props.shortenNumber(labelValue);
            return (   
                //Positions the label according to its value relative to maxRules, with a left margin based on its length
                <h7 style={{left:`calc(14.5% + ${props.labelMargin(shortLabel)}px)`,
                    top:`${props.maxHeight-(Math.log10(labelValue)/Math.log10(props.maxRules))*(props.maxHeight)}px`}}>{shortLabel} -</h7>   
            )
        });

        return(
            <>
                {labelsDiv}
            </>
        )
}