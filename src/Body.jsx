import StacksList from "../stackslist.js"
import StackElement from "./StackElement.jsx"
import {useRef, useEffect, useState} from "react"
import Projects from "./Projects.jsx"
import ContactsList from "../contactslist.js"
import ContactElement from "./ContactElement.jsx"

export default function Body(props)
{
    const about = useRef();
    const projects = useRef();
    const contact = useRef();

    const stackElements = StacksList.map((stack)=>{
        return (
          <StackElement
            src= {stack.src}
            alt= {stack.alt}
            text= {stack.text}
          />
        )
      })

      const [isHovered, setIsHovered]=useState([false,false,false]);
      function setHovered(status,pid)
      {
        let id=-1
           setIsHovered(hovered=>(hovered.map(element=>{
            id++
            if(pid==id)
              return status;
            return element;
           })))
      }

      let id=-1

      const contactElements = ContactsList.map((contact)=>{
        id++
        return (
          <ContactElement
            id={id}
            src= {contact.src}
            alt= {contact.alt}
            srcHover= {contact.srcHover}
            text= {contact.text}
            setHovered={setHovered}
            isHovered={isHovered[id]}
            action={contact.action}
          />
        )
      })



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
    
     
    window.addEventListener("scroll", () => chooseSection());

    function sendMessage(formData) {
      const data = Object.fromEntries(formData)
      console.log(data)
    }

      return (
        <main>
          <section id="about" className="about" ref={about}>
            <h2>About</h2>
            <div className="sectionElements">
              <div className="aboutText">
                <p>Hello!</p>
                <p>My name is Noah, welcome to my website! I am a software developer with a passion for web development, machine learning and backend development. Here you will find various projects that I have worked on. If you're interested in contacting me regarding a project or just want to talk I have also included my contact info below.</p>
              </div>
              <div className= "imagesContainer">
                {stackElements}
              </div>
            </div>
          </section>
    
          <section id="projects" ref={projects}>
            <h2>Projects</h2>
            <h2 style={{fontSize:"1.8rem", marginTop:"120px"}}>NHL Scorigami</h2>
            <Projects/>
          </section>

          <section id="contact" ref={contact}>
            <h2>Contact</h2>
            <div className="sectionElements">
              <div className="imagesContainer">
                {contactElements} 
              </div>
              
            </div>
          </section>
        </main>
      )
}