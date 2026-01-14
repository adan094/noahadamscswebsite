 import FetchCar from "./FetchCar.js";

 
 //Calculate and set travel cost based on user input
  export default async function submitData(make, model, year, formPart, setFormPart, rootList, setRootList, prevValues, setPrevValues, setCategories, defaultCategories, mode, addMPGResult, sequenceIndex) {
    let effMPG, tempRoot, newCategories;


    // If the same vehicle is being queried again, no need to refetch
    if (rootList.length>0&& make===prevValues[0]&&model===prevValues[1]&&year===prevValues[2])
    {
            
      // If multiple vehicles still match, ask for more specific options
      if(rootList[rootList.length-1].getCarsMatching()>1)
      {
        alert("Please select more specific options to narrow down your vehicle choice.");
        return [null, null];
      }
      if(mode==="gasComparison"&&formPart===1)
        setFormPart(3);
      else
        setFormPart(formPart+1); //move to next form part
      // Exact vehicle found, calculate cost
      const effMPG=rootList[rootList.length-1].getMatches()[0].comb08;
      if(mode==="gasComparison")
      {
        const hwyMPG=rootList[rootList.length-1].getMatches()[0].highway08;
        const cityMPG=rootList[rootList.length-1].getMatches()[0].city08;
        addMPGResult(sequenceIndex, `${year} ${make} ${model}` , effMPG, hwyMPG, cityMPG);

      }
      return [effMPG, null];
    }
    else // New vehicle, fetch data
    {
      // Reset previous selections
      setPrevValues([make, model, year]);

      // Fetch vehicle data and build tree
      [effMPG, tempRoot, newCategories] = await FetchCar(make, model, year, defaultCategories, "comb08");

      if(mode==="gasComparison")
      {
        let hwyMPG="N/A";
        let cityMPG="N/A";

        [hwyMPG, tempRoot, newCategories] = await FetchCar(make, model, year, defaultCategories, "highway08");
        [cityMPG, tempRoot, newCategories] = await FetchCar(make, model, year, defaultCategories, "city08");
        addMPGResult(sequenceIndex, `${year} ${make} ${model}` , effMPG, hwyMPG, cityMPG);

      }

      // Handle cases where no data is found
      if(effMPG==0)
      {
        alert("No matching vehicles found. Please check your inputs and try again.");
        return [null, null];
      }


      // Update categories if multiple vehicles found (will be null if exact match found)
      if(newCategories!=null)
      {
        setCategories(newCategories);
        // If multiple vehicles found, move to next form part for dropdowns
        setFormPart(1);
      }
      else
      {
        if(mode==="gasComparison"||formPart===2)
            setFormPart(3);
        else
          setFormPart(2);
      }


    }


    // Base case: no tree (no trim needed)
    if (tempRoot === null) {
      return [effMPG, null];
    }

    // Add root to state
    setRootList(prev => [...prev, tempRoot]);


    // Generate variant options for level 0
    const variantList = tempRoot
      .getChildren()
      .map(child => child.value);


    // If mpg is already known
    if (effMPG !== "N/A") {
        return [effMPG, variantList];
    }
    return null;
  }