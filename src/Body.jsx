import {useRef, useState} from "react"
import Projects from "./Projects.jsx"
import About from "./About.jsx"
import Contact from "./Contact.jsx"

//Body Component - contains the sections of the page (About, Projects, Contact)

export default function Body(props)
{
  
//Holds references to DOM nodes of each section in the page, used to determine which section is currently being viewed
    const about = useRef();
    const projects = useRef();
    const contact = useRef();

    //Checks the scroll position and sets the current section accordingly
    //Should be optimized using intersection observer API for better performance
      function chooseSection()
      {

        if(window.scrollY>=about.current.clientHeight+projects.current.clientHeight-170||(window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight)
        {
            props.setSection(2);
        }
        else if(window.scrollY>=about.current.clientHeight-170)
        {
            props.setSection(1);
        }
        else
        {
            props.setSection(0);
        }
      }
    
    //Add event listener to scroll event, so that chooseSection is called whenever the user scrolls
    window.addEventListener("scroll", () => chooseSection());

      //Renders the sections of the page
      return (
        <main>
          <section id="/about" className="about" ref={about}>
            <h2>About</h2>
            <About/>
          </section>
    
          <section id="/projects" ref={projects}>
            <h2>Projects</h2>
            <Projects/>
          </section>

          <section id="/contact" ref={contact}>
            <h2>Contact</h2>
            <Contact/>
          </section>
        </main>
      )
}
