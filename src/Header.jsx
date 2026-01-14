import {useLocation, useNavigate} from "react-router-dom"
import {useLayoutEffect} from "react"
//Header component, contains navbar with links to sections of the page

export default function Header(props)
{

    //get current location to determine which route is active (tells us which page we are on)
    const location=useLocation();

    //navigation hook to programmatically change pages (requires react-router-dom)
    const navigate=useNavigate();

    //Pathnames are used instead of section numbers since routing breaks this functionality
    //determine if we are on the GasMapper page or not
    const isGasMapper = location.pathname === "/GasMapper";
    //determine if we are on the About section/page
    const isAbout = location.pathname === "/about";

    //handles changing pages when navbar link belonging to a different page is clicked
    function handlePageChange(section)
    {
        //set the active section in App state
        props.setSection(section);
        //navigate to the correct page
        if(section==0)
            navigate("/")  
        else if (section==3)
            navigate("/GasMapper")
        

    }

    //Scroll to top when navigating to GasMapper page, useLayoutEffect to ensure it happens after DOM updates so that it is smoothly rendered
    useLayoutEffect(() => {
        if(location.pathname=="/GasMapper")
            window.scrollTo(0, 0);
    }, [location.pathname]); 


    




    //holds section data, when section is clicked: that section is made active and jumped to via # tag, if a section is active it is highlighted in the navbar
    return (
        <header>
            <ul className="Navbar">
                <a  onClick={()=>handlePageChange(0)} style={isAbout ? {color:"#02dfef"} : null} href="#/about">About</a>
                
                {!isGasMapper&&
                    <>
                        <a  style={props.activeSection==1 ? {color:"#02dfef"} : null} href="#/projects">Projects</a>
                        <a   style={props.activeSection==2 ? {color:"#02dfef"} : null} href="#/contact">Contact </a>
                    </>
                }
                
                <a  onClick={()=>handlePageChange(3)} style={isGasMapper ? {color:"#02dfef"} : null} href="#/GasMapper">Gas Mapper </a>
            </ul>
        </header>
    )
}