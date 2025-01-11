

export default function Header(props)
{


    
    return (
        <header>
            <ul className="Navbar">
                <li ><a onClick={()=> props.setSection(0)} style={props.activeSection==0 ? {color:"#02dfef"} : null} href="#about">About</a></li>
                <li><a onClick={()=> props.setSection(1)} style={props.activeSection==1 ? {color:"#02dfef"} : null} href="#projects">Projects</a></li>
                <li> <a onClick={()=> props.setSection(2)} style={props.activeSection==2 ? {color:"#02dfef"} : null} href="#contact">Contact</a></li>
            </ul>
        </header>
    )
}