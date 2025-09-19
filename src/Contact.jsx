import ContactsList from "../contactslist.js"
import ContactElement from "./ContactElement.jsx"
import {useState} from "react"

//Contains the contact section
//StackList and ContactsList information is handled very similarily and should be refactored to use a common component in the future

export default function Contact()
{

    //create an array of booleans to track whether each contact is being hovered over
    const [isContactHovered, setIsContactHovered]=useState(new Array(ContactsList.length).fill(false));

    //Map over the contacts list to create a StackElement for each contact
    let id=-1
    const contactElements = ContactsList.map((contact)=>{
        id++
        return (
            <ContactElement
                //id's are used to identify which stack is being hovered over
                id={id}
                //Gets image sources, alt text, and links from the contactslist.js file
                src= {contact.src}
                alt= {contact.alt}
                srcHover= {contact.srcHover}
                text= {contact.text}
                setHovered={setContactHovered}
                action={contact.action}
                //Gets whether this contact is being hovered over from the setContactHovered array being stored in state
                isHovered={isContactHovered[id]}
            />
        )
    })

    //Function that sets the hover state of all contact elements
    //pid of stack being hovered over is passed in from that contact element to identify which contact should be given hover state, all others are set to false
    function setContactHovered(status,pid)
    {
        let id=-1
        setIsContactHovered(hovered=>(hovered.map(element=>{
            id++
            if(pid==id)
                return status;
            return element;
        })))
      }

      

    return (
        <div className="sectionElements">
            <div className="imagesContainer">
                {contactElements} 
            </div>
        </div>
    )

}
