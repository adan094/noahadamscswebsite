import {useEffect, useState } from "react"
import FuelEfficiencyRow from "./FuelEfficiencyRow.jsx"
import getCarAttributeOptions from "../getCarAttributeOptions.js"


export default function FuelEfficiencyRankings(){

    const [makeOptions, setMakeOptions] = useState([]);

    const [makeIsSetToAll, setMakeIsSetToAll] = useState(true);

    const [modelOptions, setModelOptions] = useState([]);

    const [yearOptions, setYearOptions] = useState([]);

    const [top10Rows, setTop10Rows] = useState([]);

    //Need to add regular gasoline filtering

    async function getMostFuelEfficientVehicles(querySuffix="")
    {
        alert(querySuffix);
        const response = await fetch('https://rwwztvngqwunokpnrsbq.supabase.co/rest/v1/MPG?fuelType1=eq.Regular Gasoline'+querySuffix+'&order=comb08.desc', {
            method: 'GET', // Or POST, PUT, DELETE for other operations
            headers: {
                'Content-Type': 'application/json',
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3d3p0dm5ncXd1bm9rcG5yc2JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTU1OTgsImV4cCI6MjA3NjgzMTU5OH0.PUJxVHjXnUu83tfgGoI4zf9nvkP7o1ohafuWZzUl4vY',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3d3p0dm5ncXd1bm9rcG5yc2JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTU1OTgsImV4cCI6MjA3NjgzMTU5OH0.PUJxVHjXnUu83tfgGoI4zf9nvkP7o1ohafuWZzUl4vY' // For authenticated users, this would be their JWT
            }
        })
        const data = await response.json();



        const top10 = data.slice(0,10);

        var id=0;
        setTop10Rows(top10.map((car)=>{
            id++;
            return <FuelEfficiencyRow car={car} rank={id} />
        }));
    }

    async function createOptionsList(name, setterFunction, selectedValue=null)
    {
        let options = await getCarAttributeOptions(name, selectedValue);
        options = (options.map((o)=>{
            return <option value={o}>{o}</option>
        }));
        setterFunction(options);
    }

    function setupFilters()
    {
        createOptionsList("make", setMakeOptions);
        createOptionsList("year", setYearOptions);
    }

    async function handleMakeChange (e)
    {
        const selected = e.target.value;
        setModelOptions([]);
        setMakeIsSetToAll(selected==="");
        createOptionsList("baseModel", setModelOptions, selected);
    }

    function createFilteredRankings(make, model, operation, year)
    {
        let append="";

        if(make)
            append+='&make=eq.'+make;

        if(model)
            append+='&baseModel=eq.'+model;

        if(operation!='since' || year!='1984')
        {
            append+='&year='
            if(operation=='since')
                append+='gte';
            else if (operation=='until')
                append+='lte';
            else
                append+='eq';

            append +='.'+year;
        }

        getMostFuelEfficientVehicles(append);
            
    }

    function handleSubmit(e)
    {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const make = formData.get("makeFilter");
        const model = formData.get("modelFilter");
        const operation = formData.get("yearOperation");
        const year = formData.get("yearFilter");

        createFilteredRankings(make, model, operation, year);

    }

    useEffect(() => {
        getMostFuelEfficientVehicles();
        setupFilters();
    }, []);
         

    return(
        <div className="FuelEfficiencyRankingsSection">
            <form onSubmit={handleSubmit}>

                <label> Make: </label>
                {/*next step: add change listener to populate model dropdown based on selected make*/}
                <select name= "makeFilter" onChange={(e)=>handleMakeChange(e)} id="makeFilter">
                    <option selected value="">All</option>
                    {makeOptions}
                </select>

                <label> Base Model: </label>
                <select style={{width:"280px"}} disabled={makeIsSetToAll} name= "modelFilter" id="modelFilter">
                    <option selected value="">All</option>
                    {modelOptions}
                </select>
                <label></label>

                <label> Years: </label>
                <select style={{marginRight:"0.3vw"}} name= "yearOperation" id="yearOperation">
                    <option selected value="since">Since </option>
                    <option value="from">From </option>
                    <option value="until:">Until </option>
                </select>

                <select name= "yearFilter" id="yearFilter">
                    {yearOptions}
                </select>

                <button type="submit">Submit</button>

            </form>

            <h3>Top 10 Most Fuel Efficient Vehicles using Regular Gasoline as primary fuel type</h3>

            <table className="EfficiencyTable">
                <tr>
                    <th>Rank</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Combined MPG</th>
                    <th>Highway MPG</th>
                    <th>City MPG</th>
                </tr>
                {/* Table rows would be populated here dynamically */}
                {top10Rows}
            </table>
        </div>
    )
}