
import { useEffect } from "react"
import FetchGasPrices from "../FetchGasPrices.js"

//Component to get average gas prices from an API and display them

export default function GasMapper()
{

    let GasPricesData;

        // Fetch data from the NHL API
       useEffect(() => {
    
            //Wait for Fetch to complete before setting HistoricData
            (async () => await FetchGasPrices())()
        
        }, [GasPricesData])


    return(<>
            <p>{GasPricesData}</p>
        </>
    )

}