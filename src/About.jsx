import stackslist from "../stackslist.js";
import StacksList from "../stackslist.js"
import StackElement from "./StackElement.jsx"
import {useState} from "react"

//Contains the about me section

export default function About()
{

  //create an array of booleans to track whether each stack is being hovered over
  const [isStackHovered, setIsStackHovered]=useState(new Array(stackslist.length).fill(false));
    
  //Map over the stacks list to create a StackElement for each stack
  let id=-1;
  const stackElements = StacksList.map((stack)=>{
    id++;
    return (
      <StackElement
        //id's are used to identify which stack is being hovered over
        id={id}
        //Gets image sources, alt text, and links from the stackslist.js file
        src= {stack.src}
        srcHover= {stack.srcHover}
        alt= {stack.alt}
        text= {stack.text}
        link={stack.link}
        setHovered={setStackHovered}
        //Gets whether this stack is being hovered over from the isStackHovered array being stored in state
        isHovered={isStackHovered[id]}
      />
    )
  })

  //Function that sets the hover state of all stack elements
  //pid of stack being hovered over is passed in from that stack element to identify which stack should be given hover state, all others are set to false
  function setStackHovered(status,pid)
  {
    let id=-1
    setIsStackHovered(hovered=>(hovered.map(element=>{
      id++
      if(pid==id)
        return status;
      return element;
    })))
  }

    return (
        <div className="sectionElements">
            <div className="aboutText">
                <p>Hi there, I'm Noah Adams, a passionate Software Developer and Machine Learning Enthusiast with a strong background in full-stack web development, data analysis, and AI/ML. I hold a Bachelor’s degree in Computer Science, specializing in Artificial Intelligence, and I have hands-on experience in designing, developing, and optimizing solutions across multiple domains.</p>
                <p>On this website, you'll find details about my projects, skills, and professional experiences. I am always excited about new opportunities to contribute to cutting-edge technologies and solve complex problems in impactful ways. Whether you’re looking to hire for a technical role or collaborate on innovative projects, I'd love to connect and see how we can work together to create something meaningful.</p>
                <p>Feel free to explore my portfolio and get in touch if you'd like to learn more about my work or discuss how I can contribute to your team. Thanks for visiting!</p>
            </div>
            <div className= "imagesContainer">
                {stackElements}
            </div>
    </div>
    )
}