import {useState} from "react"
import Header from "./Header.jsx"
import Body from "./Body.jsx"

export default function App() {

  const [activeSection, setActiveSection] = useState(0)
    
  function setSection(sectionNumber)
  {
    setActiveSection(sectionNumber)
  }


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

