
//Component for the Gas Calculator and Mapper project page

import GetGasPrices from "./GetGasPrices.jsx";

export default function GasMapper()
{

    return(<>
                <div>
                    {/* Project explanation */}
                    <p>The Gas Calculator and Mapper is a web application designed to help users find the best gas prices in their area while also providing an estimate of their vehicle's fuel consumption and cost for a given trip. The application features an interactive map that displays gas stations along with their current prices, allowing users to make informed decisions about where to refuel.</p>
                    <p>Users can input their vehicle's make, model, and year to receive accurate fuel consumption estimates based on real-world data. The calculator takes into account factors such as distance, fuel efficiency, and current gas prices to provide users with a comprehensive overview of their potential fuel costs for any planned journey.</p>
                    <p>The mapping feature utilizes geolocation technology to identify nearby gas stations and display them on an interactive map. Users can filter results based on price, distance, and brand preferences, making it easy to find the most convenient and cost-effective options.</p>
                </div>

                {/* Gets local gas prices */}
                <GetGasPrices/>

            </>
            )
}