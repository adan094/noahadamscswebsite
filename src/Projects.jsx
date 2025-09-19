import NHLScorigami from "./NHLScorigami"
import ResearchProject from "./ResearchProject"
import Project from "./Project.jsx"

//Projects Component - contains the individual projects
export default function Projects()
{

   return(
    /* Render individual projects */
    <>
        {/* NHL Scorigami project */}
        <Project 
            sectionTitle={"NHL Scorigami"}
            /* Pass the section as an argument to be used by Project */
            section = {<NHLScorigami />}
            /* Pass the image IDs for the stacklist in header of the project page */
            imagesIDs={[0,1,2,3,10]}
        />

        {/* Research Project */}
        <Project 
            sectionTitle={"Market Basket Analysis using K-Means Clustering"}
            /* Pass the section as an argument to be used by Project */
            section = {<ResearchProject />}
            /* Pass the image IDs for the stacklist in header of the project page */
            imagesIDs={[0,1,2,3,10]}
        />


    </>
   )
}