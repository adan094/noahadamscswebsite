
//creates formatted labelling for the vertical axis of the graph

export default function VerticalLabel(props)
{
    
        //assigns divisor to the highest power of 10 that the max vertical vlaue is greater than
        var divisor = 1;
        while(props.maxRules/divisor>10)
            divisor*=10;

        //asigns maxLabel to the highest multiple of divisor that is less than or equal to maxRules
        const maxLabel = Math.floor(props.maxRules/divisor)*divisor;
    
        //creates array of labels, each being a multiple of divisor, up to maxLabel
        const labels = Array(maxLabel/divisor);
        for(let i=0; i<maxLabel/divisor; i++)
            labels[i]=(i+1)*divisor;
    
        //creates divs for each label, positions them according to their value relative to maxRules
        const labelsDiv = labels.map((labelValue) => {
            return (   
                <h7 style={{top:`${props.maxHeight-(labelValue/props.maxRules)*(props.maxHeight)-5}px`}}>{labelValue} -</h7>   
            )
        });

        return(
            <>
                {labelsDiv}
            </>
        )
}