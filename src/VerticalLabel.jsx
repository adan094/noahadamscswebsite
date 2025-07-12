

export default function VerticalLabel(props)
{
    
        var divisor = 1;
        while(props.maxRules/divisor>10)
            divisor*=10;
        const maxLabel = Math.floor(props.maxRules/divisor)*divisor;
    
        const labels = Array(maxLabel/divisor);
        for(let i=0; i<maxLabel/divisor; i++)
            labels[i]=(i+1)*divisor;
    
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