
//Implement postgres views for make and year, model should be fine to do the current way because there shouldn't be over 1000 of the same model of car.
export default async function getCarAttributeOptions(attribute, selectedValue=null){

    let fetchAppend = 'mpg_distinct_'+attribute+'s?select*';
    if(selectedValue)
        fetchAppend="MPG?make=eq."+selectedValue;

    const response = await fetch('https://rwwztvngqwunokpnrsbq.supabase.co/rest/v1/'+fetchAppend, {
      method: 'GET', // Or POST, PUT, DELETE for other operations
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3d3p0dm5ncXd1bm9rcG5yc2JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTU1OTgsImV4cCI6MjA3NjgzMTU5OH0.PUJxVHjXnUu83tfgGoI4zf9nvkP7o1ohafuWZzUl4vY',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3d3p0dm5ncXd1bm9rcG5yc2JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTU1OTgsImV4cCI6MjA3NjgzMTU5OH0.PUJxVHjXnUu83tfgGoI4zf9nvkP7o1ohafuWZzUl4vY' // For authenticated users, this would be their JWT
      }
    })
    const data = await response.json();
    let dataSet = new Set();
console.log(JSON.stringify(data))
    //We loop through the data instead of directly using SQL DISTINCT bc supabase free tier doesn't support it
    //Also we can't just add the array to the set constructor because they still contain object wrappers
    data.forEach((item)=>{
        //alert(item[attribute]);
        dataSet.add(item[attribute]);
    });


    return Array.from(dataSet).sort();
}

