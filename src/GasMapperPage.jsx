import Project from "./Project.jsx"
import GasMapper from "./GasMapper.jsx"
import Header from "./Header.jsx"
import CompareGasPrices from "./CompareGasPrices.jsx"
import FuelEfficiencyRankings from "./FuelEfficiencyRankings.jsx"

export default function GasMapperPage(props){
return(
    <>
        <Header
            setSection = {props.setSection}
            activeSection= {props.activeSection}
        />
            {/* Gas Calculator and Mapper */}
            <Project 
                sectionTitle={"Gas Calculator and Mapper"}
                /* Pass the section as an argument to be used by Project */
                section = {<GasMapper />}
                /* Pass the image IDs for the stacklist in header of the project page */
                imagesIDs={[]}
            />
            {/* Fuel efficency comparer */}
            <Project 
                sectionTitle={"Compare Fuel Efficiency"}
                /* Pass the section as an argument to be used by Project */
                section = {<CompareGasPrices />}
                /* Pass the image IDs for the stacklist in header of the project page */
                imagesIDs={[]}
            />

            {/* Fuel Efficiency Rankings */}
            <Project 
                sectionTitle={"Fuel Efficiency Rankings"}
                /* Pass the section as an argument to be used by Project */
                section = {<FuelEfficiencyRankings />}
                /* Pass the image IDs for the stacklist in header of the project page */
                imagesIDs={[]}
            />
    </> 
)
}
