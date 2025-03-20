import NHLScorigami from "./NHLScorigami"
import ResearchProject from "./ResearchProject"
import SectionHeader from "./SectionHeader.jsx"

export default function Projects()
{

   return(
    /* Render individual projects */
    <>
        
        <SectionHeader 
            sectionTitle={"NHL Scorigami"}
            /* Pass the section as an argument to be used by SectionHeader */
            section = {<NHLScorigami />}
        />
       { /*<ResearchProject/>*/}
    </>
   )
}