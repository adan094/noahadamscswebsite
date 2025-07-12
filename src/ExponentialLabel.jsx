import VerticalLabelExponential from "./VerticalLabelExponential.jsx";
import HorizontalLabelExponential from "./horizontalLabelExponential.jsx";

export default function ExponentialLabel(props) 
{

    function shortenNumber(num) {
        if (num < 1e3) return num;
        const suffixes = ["", "K", "M", "B", "T"];
        const suffixNum = Math.floor(("" + num).length / 3);
        let shortNum = parseFloat((suffixNum !== 0 ? num / Math.pow(10, suffixNum * 3) : num).toPrecision(2));
       
        if (shortNum < 1 && suffixNum > 0) {
            shortNum = shortNum * 1000;
            return shortNum + suffixes[suffixNum - 1];
        }
       
        if (shortNum % 1 !== 0) shortNum = shortNum.toFixed(1);
        return shortNum + suffixes[suffixNum];
    }

    function labelMargin(labelValue) {
        var margin = 24;
        if(labelValue[labelValue.length-1] == "K")
            margin+=3;
        else if(labelValue[labelValue.length-1] == "B")
            margin+=3;

        if(labelValue=="100")
            margin+=16;
        else if(labelValue=="10")
            margin+=27;
        else if(labelValue=="1")
            margin+=38;
        else if(labelValue.length==3)
            margin+=11;
        else if(labelValue.length==2)
            margin+=22;

        return margin;
    }

    var divisor = 1;
    while(props.maxRules/divisor>10)
        divisor*=10;
    const maxLabel = Math.floor(props.maxRules/divisor)*divisor;

    const labels = Array(Math.log10(maxLabel)+1);
    for(let i=0; i<=Math.log10(maxLabel); i++)
        labels[i]=Math.pow(10,i);

   if(props.labelType==="vertical")
    {
        return(
            <VerticalLabelExponential
            
                maxRules={props.maxRules}
                maxHeight={props.maxHeight}
                labels={labels}
                labelMargin={labelMargin}
                shortenNumber={shortenNumber}

            />
        )
    }
    else
    {
        return(
            <HorizontalLabelExponential
            
                maxRules={props.maxRules}
                labels={labels}
                labelMargin={labelMargin}
                shortenNumber={shortenNumber}

            />
        )
    }

}