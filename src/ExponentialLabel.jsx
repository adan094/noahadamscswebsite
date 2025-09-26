import VerticalLabelExponential from "./VerticalLabelExponential.jsx";
import HorizontalLabelExponential from "./horizontalLabelExponential.jsx";

//Component which generates either vertical or horizontal labels for the graph, using an exponential scale
export default function ExponentialLabel(props) 
{

    //Shortens a number to a more readable format with K, M, B, T suffixes, ensures between 1 and 4 digits are shown
    function shortenNumber(num) {
        if (num < 1e3) 
            return num;
        const suffixes = ["", "K", "M", "B", "T"];

        //Gets the number of 1000s in the number uding length of the number string
        const suffixNum = Math.floor(("" + num).length / 3);

        //Divides the number by 1000^suffixNum to get a number between 0.1 and 10, limits to 2 significant digits
        let shortNum = parseFloat((suffixNum !== 0 ? num / Math.pow(10, suffixNum * 3) : num).toPrecision(2));
       
        //If the number is less than 1, multiply by 1000 and use the previous suffix (e.g. 0.5K -> 500)
        if (shortNum < 1 && suffixNum > 0) {
            shortNum = shortNum * 1000;
            return shortNum + suffixes[suffixNum - 1];
        }
       
        //If the number is an integer (it will be), don't show decimal places
        if (shortNum % 1 !== 0) shortNum = shortNum.toFixed(1);
            return shortNum + suffixes[suffixNum];
    }

    //Calculates the left margin needed for a label based on its length and suffix
    function labelMargin(labelValue) {
        //Base margin is -60 to account for left padding of the graph
        var margin = -60;
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

    //Calculates the max label to show on the graph, rounds down to nearest power of 10
    var divisor = 1;
    while(props.maxRules/divisor>10)
        divisor*=10;
    const maxLabel = Math.floor(props.maxRules/divisor)*divisor;

    //Generates the labels to show on the graph, from 1 to maxLabel, in powers of 10
    const labels = Array(Math.log10(maxLabel)+1);
    for(let i=0; i<=Math.log10(maxLabel); i++)
        labels[i]=Math.pow(10,i);

    //Renders either a vertical or horizontal label component based on props
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