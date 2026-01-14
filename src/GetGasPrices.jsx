import { useState, useEffect } from "react";

import submitData from "../SubmitData.js";
import CalculateTrip from "../CalculateTrip.jsx";


export default function GetGasPrices(props) {

//implement i dont know functionality ? as well?

//add credentials for licensing
//add regular gasoline filter
//Then start on QOL improvments fixing the biggest usability issues first (example needing address in exact format)
//Make it as foolproof as possible and then add stuff to add some more ease of use






  //Conversion factor from MPG to L/100km
  const mpgPerL100 = 235.21;

  //default categories for dropdowns in order
  const defaultCategories = ["model variant", "fuel type", "transmission type", "cylinders", "engine description", "drive type", "alternative fuel type"];

  const [formPart, setFormPart] = useState(0); //tracks which part of the form is being displayed

  const [cost, setCost] = useState(0);

  //Holds categories in state to allow for dynamic removal
  const [categories, setCategories] = useState(defaultCategories);

  //Holds price result
  const [submittedData, setSubmittedData] = useState(null);

  // Options for each dropdown level
  const [options, setOptions] = useState([[], [], [], [], [], [], []]); 

  //Holds tree roots at each level, going down a level makes a new root at the selected child
  const [rootList, setRootList] = useState([]); 

  //Holds previous make, model, year to avoid refetching and know whether user is searching for a new vehicle or for the price on the same one
  const [prevValues, setPrevValues] = useState([]);

  //Hold whether loading slider is active
  const [isLoading, setIsLoading] = useState(false);
  

      useEffect(() => {
      // Reset options and roots
      setOptions([[], [], [], [], [], [], []]);
      setRootList([]);
      setSubmittedData(null);
      }, [prevValues]
      )

      useEffect(() => {
        if(formPart===3&&props.mode==="gasComparison")
          props.setCompleted(props.sequenceIndex);
      }, [formPart]
      )

  // Reset the form to initial state
  function resetForm() {
    setFormPart(0);
    setCategories(defaultCategories);
    setSubmittedData(null);
    setOptions([[], [], [], [], [], [], []]);
    setRootList([]);
    setPrevValues([]);
  }

  // Create a new options list for a given level
  function updateOptionList(optionList, level) {
    setOptions(prev => {
      const updated = [...prev];
      //adds new option list at level
      updated[level] = optionList; 
      return updated;
    });
  }




  // Handle dropdown selection
  function handleChange(e, level) {
    const selected = e.target.value;
    const currentRoot = rootList[level];

    if (!currentRoot) return;

    const nextRoot = currentRoot.getChild(selected);

    // append nextRoot to rootList
    setRootList(prev => [...prev.slice(0, level + 1), nextRoot]);

    // generate next-level options
    const nextList = nextRoot
      .getChildren()
      .map(child => child.value);

    updateOptionList([...new Set(nextList)].sort(), level + 1);
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const fromAddress = formData.get("fromAddress");
    const toAddress = formData.get("toAddress");
    let make = formData.get("make");
    let model = formData.get("model");
    let year = formData.get("year");

    let effMPG=null;
    let variantList=null;

    let addMpgResult=null;
    if(props.mode==="gasComparison")
      addMpgResult=props.addMpgResult;


    if(make==""||model==""||year=="")
    {
      if(formPart===0)
      {
        alert("Please fill in all fields before submitting.");
        return;
      }
      else if (formPart===2)
      {
        // Use previous values if fields are left blank
        make=prevValues[0];
        model=prevValues[1];
        year=prevValues[2];
      }
    }

   [effMPG, variantList] = await submitData(make, model, year, formPart, setFormPart, rootList, setRootList, prevValues, setPrevValues, setCategories, defaultCategories, props.mode, addMpgResult, props.sequenceIndex);


    if(effMPG!=null)
    {
      if(props.mode==="gasCalculator")
      {
        let distance=0;
        let duration=0;
        let cost;
        if(fromAddress!=null&&toAddress!=null)
        {
          setIsLoading(true);
          [distance, duration, cost] = await CalculateTrip(fromAddress, toAddress, setIsLoading);
          if (distance==null||duration==null)
            setFormPart(2); //stay on address input form
        }
        const eff = mpgPerL100 / parseFloat(effMPG);
        const travelCost = distance * eff / 100 * cost;
        setSubmittedData(travelCost.toFixed(2));
      }

      if(variantList!=null)
        updateOptionList([...new Set(variantList)].sort(), 0);  // Set options for level 0
    }

  }

  return (
    <>
      {formPart <3 && <form onSubmit={handleSubmit}>
        <div className="formFieldWrapper">
            <div style={{display: formPart===0 ? 'flex': 'none'}} className="formColumn" >
              <label>Make:</label>
              <input type="text" name="make" />

              <label>Model:</label>
              <input type="text" name="model" />

              <label>Year:</label>
              <input type="number" name="year" min="1990" max="2030"/>
            </div>

          {/* Render dynamic dropdowns */}
          {formPart===1 &&
            <div className="formColumn" >
              {categories.map((label, i) => ( rootList[i] && rootList[i].getCarsMatching()>1 &&
                <>
                  <label>{label}:</label>

                  <select onChange={(e) => handleChange(e, i)}>
                    <option selected disabled value="">Choose {label}</option>

                    {options[i].map(opt => (
                      <option key={opt} value={opt}>
                        {opt === "" ? "N/A" : opt}
                      </option>
                    ))}
                  </select>
                </>
              ))}
            </div>
          }

          {formPart===2 &&
            <div className="formColumn">
              <label>From Address:</label>
              <input type="text" name="fromAddress" step="0.1" required/>

              <label>To Address:</label>
              <input type="text" name="toAddress" step="0.1" required/>
            </div>
          }
        </div>

        
        <button type="submit">Submit</button>
      
      </form>}
        {formPart===3 && props.mode==="gasCalculator" && !isLoading &&
          <div className="resultDisplay">
            <p className="result">Travel Cost: <span style={{color:"#02dfef"}}>${submittedData}</span></p>
            <div style={{width: "100%", textAlign: "center"}}>
              <button onClick= {resetForm} className="reset" type="submit">Reset</button>
            </div>
          </div>
        }
        {formPart===3 && props.mode==="gasCalculator" && isLoading &&
          <div className="loadingDisplay">
            <img style={{width: "100px"}} src="./loadingIcon.gif" alt="Loading..." />
          </div>
        }
    </>
  );
}