import Header from "./Header.jsx"
import Body from "./Body.jsx"

export default function Home(props){



    return(
    <div>
      <Header
      setSection = {props.setSection}
      activeSection= {props.activeSection}
      />
      <Body
        setSection = {props.setSection}
      />
    </div>
    )
}