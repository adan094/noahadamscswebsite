import TreeNode from "./TreeNode.js"


export default async function FetchCar(make, model, year, categories, mpgType){



var removeCounter=0;

//alert("removeCounter: " + removeCounter);

var firstRun=true;
 

function multipleDifferentChildren(root, data, attribute, depth)
{

  if(data.length<2)
    return [false, true];

  let optionsSet = new Set();

  data.map((item)=>{
    optionsSet.add(item[attribute]);
  });

  if(firstRun&&optionsSet.size<2)
  {
    categories.splice(depth-removeCounter, 1); //remove attribute from list
    removeCounter++;
  }
  firstRun=false;

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

  let isComplete=true;
  console.log("z: "+JSON.stringify(root.getChildren()));

  //alert("Checking child attribute "+attribute+" at depth "+depth+" children "+ root.getChildren().length);

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

  firstRun=true;
//constructs roots children
[root, isComplete] = checkAtrribute(root, data, "model", 0, 0);

  console.log("yeeeeeeeeeee" + JSON.stringify(root));

  firstRun=true;
//constructs layer by transmission
if(!isComplete)
  [root, isComplete] = checkChildAttribute(root, "fuelType1", 1, 1);



  firstRun=true;
//constructs layer by transmission
if(!isComplete)
  [root, isComplete] = checkChildAttribute(root, "trany", 2-removeCounter, 2);

  firstRun=true;
//constructs layer by transmission
if(!isComplete)
  [root, isComplete] = checkChildAttribute(root, "cylinders", 3-removeCounter, 3);

  firstRun=true;
//constructs layer by transmission
if(!isComplete)
  [root, isComplete] = checkChildAttribute(root, "eng_dscr", 4-removeCounter, 4);

  firstRun=true;
//constructs layer by transmission
if(!isComplete)
  [root, isComplete] = checkChildAttribute(root, "drive", 5-removeCounter, 5);

  firstRun=true;
//constructs layer by transmission
if(!isComplete)
  [root, isComplete] = checkChildAttribute(root, "fuelType2", 6-removeCounter, 6);

  
  console.log(JSON.stringify(root));




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

      return [data[0][mpgType], findRequiredAttribute(data), categories];
      
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