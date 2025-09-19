import {useState} from "react"
import Header from "./Header.jsx"
import Body from "./Body.jsx"

export default function App() {

  //stores which section of the page the user is currently viewing
  const [activeSection, setActiveSection] = useState(0)
    
  function setSection(sectionNumber)
  {
    setActiveSection(sectionNumber)
  }


  //Renders the header and body components, givign them each teh ability to set the active section with the Header using this information to the naavbar when required.
  return(
    <div>
      <Header
      setSection = {setSection}
      activeSection= {activeSection}
      />
      <Body
        setSection = {setSection}
      />
    </div>
  )

  
}

