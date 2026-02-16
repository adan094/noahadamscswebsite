import TreeNode from "./TreeNode.js"


export default async function FetchCar(make, model, year, categories, mpgType){

  
  //need to add displ to the dropdown list options and database im pulling from


var removeCounter=0;

//alert("removeCounter: " + removeCounter);

var firstRun=true;

var newCategories=[];
 

function multipleDifferentChildren(root, data, attribute, depth)
{

 // alert(attribute);




  if(data.length<2)
    return [false, false];

  let optionsSet = new Set();

  data.map((item)=>{
    optionsSet.add(item[attribute]);
  });

  if(((newCategories.length>0&&newCategories[newCategories.length-1]!=attribute)||newCategories.length==0)&&optionsSet.size>1)
  {
    //optionlist needs to be additive instead, adding to the lsit of the attribute is not already there.

    newCategories = [...newCategories, attribute];

   // alert(JSON.stringify(newCategories));

    /*alert(attribute);

    for (const item of optionsSet) 
      alert(item);
    alert(JSON.stringify(categories))
    categories.splice(depth-removeCounter, 1); //remove attribute from list
    alert(JSON.stringify(categories))
    removeCounter++;*/
  }

  //alert(optionsSet.size+" options found for attribute "+attribute);

  return [optionsSet.size>1, false];
}

//add attribute as layer in tree
function checkAtrribute(root, data, attribute, depth)
{


  // alert("y");

  //tracks if all data items were added without matches
  let isComplete=true;
  let prevRoot = root.clone();
  let optionsSet = new Set();
  let diffChildren=false;

  [diffChildren, isComplete] =multipleDifferentChildren(root, data, attribute, depth)
  //alert(isComplete+" "+diffChildren);
  if(!diffChildren)
    return [root, isComplete];

  //alert("yep");

  //checks all child elements
  data.map((item)=>{


    if(!root.childExists(item[attribute]))
    {
      root.addChild(new TreeNode(item[attribute], item));
      optionsSet.add(item[attribute]);
    } 
    else
    {
      //found a match, so not all items were unique
      isComplete=false;
      root.addMatch(item[attribute], item);
    }
  });







      return [root, isComplete];
}


//checks the children of the children of the attributes
function checkChildAttribute(root, attribute, depth, totalDepth)
{

//if(attribute=="eng_dscr"&&depth===1)
  //alert(JSON.stringify(root));

  let isComplete=true;
  console.log("z: "+JSON.stringify(root.getChildren()));



 // alert("Checking child attribute "+attribute+" at depth "+depth+" children "+ root.getChildren().length);

  root.getChildren().map((child)=>{
    if(child.getLeaf()===false)
    {
      //console.log("a: "+JSON.stringify(child));
      let wasComplete=true;
      //recursive calls to get next layer of child when necessary
      //alert("?");
       if(depth>1)
          [child, wasComplete] = checkChildAttribute(child, attribute, depth-1, totalDepth);
        else 
          [child, wasComplete] = checkAtrribute(child, child.getMatches(), attribute, totalDepth);
      if(!wasComplete)
        isComplete=false;
      //console.log("b: "+JSON.stringify(child));
      return null;
    }
  });
  console.log("c: "+JSON.stringify(root));
  return [root, isComplete];
}


  //algorithm that finds what data is needed to seperate model variants
  function findRequiredAttribute(data)
  {


let root = new TreeNode('seperationTree', null, data.length);
let isComplete=false;

//constructs roots children
[root, isComplete] = checkAtrribute(root, data, "model", 0, 0);

  console.log("yeeeeeeeeeee" + JSON.stringify(root));


  var prevCategoriesLength=0;
  
const categoriesToCheck=["fuelType1", "trany", "cylinders", "eng_dscr", "drive", "fuelType2", "displ"];
let treeDepth=0;

categoriesToCheck.map((attribute)=>{
  treeDepth++;
  if(!isComplete)
    [root, isComplete] = checkChildAttribute(root, attribute, treeDepth-removeCounter, treeDepth);

  if(newCategories.length===prevCategoriesLength)
    removeCounter++;
  prevCategoriesLength=newCategories.length;

});

  
      console.log("Root at point of return: " + JSON.stringify(root));




      return root;
  }

  //function to correct case of make and model
function correctCase(str)
{


  //split by spaces
  const words = str.split(" ");

  //capitalize first letter of each word
  words.map(word=>{
    if(word.length===0)
      return "";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  })

//alert(words.join(" "));

  //join back together
  return words.join(" ");

}



       console.log("fetching car");


//format make and model to have first letter capitalized only
let formattedMake = correctCase(make);
let formattedModel = correctCase(model);

async function getCarMPG(urlAppend)
{       




//alert("Fetching MPG for "+formattedMake+" "+formattedModel+" "+year);

     const response = await fetch('https://rwwztvngqwunokpnrsbq.supabase.co/rest/v1/MPG?make=eq.'+formattedMake+'&year=eq.'+year+urlAppend, {
      method: 'GET', // Or POST, PUT, DELETE for other operations
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3d3p0dm5ncXd1bm9rcG5yc2JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTU1OTgsImV4cCI6MjA3NjgzMTU5OH0.PUJxVHjXnUu83tfgGoI4zf9nvkP7o1ohafuWZzUl4vY',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3d3p0dm5ncXd1bm9rcG5yc2JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTU1OTgsImV4cCI6MjA3NjgzMTU5OH0.PUJxVHjXnUu83tfgGoI4zf9nvkP7o1ohafuWZzUl4vY' // For authenticated users, this would be their JWT
      }
    })
    const data = await response.json();

   // alert(data.length+" results found");

    if(data.length===0)
    {
      return [0, null, null];
    }

    //if there is more than one result, ask for more specific info
    else if(data.length>1)
    {


      return [data[0][mpgType], findRequiredAttribute(data), newCategories];
      
    }


 JSON.stringify(categories);
    return [data[0][mpgType], null, null];

         

}

        
let modelType = "baseModel";
    
//check baseModel first
let mpg = await getCarMPG('&'+modelType+'=eq.'+formattedModel);
//alert("mpg: "+mpg[0]);
if(mpg!=0)
  return mpg;

//alert("checking model type");

  modelType = "model";
  mpg = await getCarMPG('&'+modelType+'=eq.'+formattedModel);
  if(mpg)
    return mpg;


return "N/A";


   

};