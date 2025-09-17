import NHLScorigami from "./NHLScorigami"
import ResearchProject from "./ResearchProject"
import SectionHeader from "./SectionHeader.jsx"

export default function Projects()
{

   return(
    /* Render individual projects */
    <>
        {/* NHL Scorigami project */}
        <SectionHeader 
            sectionTitle={"NHL Scorigami"}
            /* Pass the section as an argument to be used by SectionHeader */
            section = {<NHLScorigami />}
            /* Pass the image IDs for the stacklist in header of the project page */
            imagesIDs={[0,1,2,3,10]}
        />

        {/* Research Project */}
        <SectionHeader 
            sectionTitle={"Market Basket Analysis using K-Means Clustering"}
            /* Pass the section as an argument to be used by SectionHeader */
            section = {<ResearchProject />}
            /* Pass the image IDs for the stacklist in header of the project page */
            imagesIDs={[0,1,2,3,10]}
        />


    </>
   )
}