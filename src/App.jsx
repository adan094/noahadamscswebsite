
import { HashRouter, Routes, Route } from "react-router-dom"
import {useState} from "react"
import Home from "./Home.jsx"
import GasMapperPage from "./GasMapperPage.jsx"

export default function App() {

        //stores which section of the page the user is currently viewing
        const [activeSection, setActiveSection] = useState(0)
          
        function setSection(sectionNumber)
        {
          setActiveSection(sectionNumber)
        }

        let homePaths = ["/", "/about", "/projects", "/contact"]
        homePaths = homePaths.map((e)=>{
        return <Route path={e} element={ <Home activeSection={activeSection} setSection={setSection}/>}/>
      });


  //Renders the header and body components, giving them each teh ability to set the active section with the Header using this information to the naavbar when required.
  return(



<HashRouter>
    <Routes>
      {homePaths}
      <Route path="/GasMapper" element={<GasMapperPage/>}/>
      </Routes>
</HashRouter>
    
  )

  
}

