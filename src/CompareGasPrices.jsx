import GetGasPrices from "./GetGasPrices"
import {useState} from "react";

export default function CompareGasPrices(){

const [isCompleted, setIsCompleted] = useState([false, false]);
const [mpgResults, setMpgResults] = useState([null, null]);

function setCompleted(index)
{
    const newCompleted = [...isCompleted];
    newCompleted[index] = true;
    setIsCompleted(newCompleted);
}

function addMpgResult(index, CarName, CombMPG, HwyMPG, CityMPG)
{
    const newResults = [...mpgResults];
    newResults[index] = {CarName: CarName, CombMPG: CombMPG, HwyMPG: HwyMPG, CityMPG: CityMPG};
    setMpgResults(newResults);
}

    return(
            <>
                {/* Compares local gas prices */}
                {(!isCompleted[0] || !isCompleted[1]) &&
                <div className="GasComparerSection">
                    
                       {isCompleted[0]? <h2>{mpgResults[0].CarName}</h2> :<h2>Car 1</h2>}
                    
                    <GetGasPrices
                        mode={"gasComparison"}
                        setCompleted={setCompleted}
                        addMpgResult={addMpgResult}
                        sequenceIndex={0}
                    />
                </div>
                }
                {(!isCompleted[0] || !isCompleted[1]) &&
                    <div className="GasComparerSection">
                        
                            {isCompleted[1]? <h2>{mpgResults[1].CarName}</h2> :<h2>Car 2</h2>}
                        
                        <GetGasPrices
                            mode={"gasComparison"}
                            setCompleted={setCompleted}
                            addMpgResult={addMpgResult}
                            sequenceIndex={1}
                        />
                    </div>
                }
                {isCompleted[0] && isCompleted[1] &&
                    <table className="ComparisonResults">
                        <tr>
                            <th></th>
                            <th>{mpgResults[0].CarName}</th>
                            <th>{mpgResults[1].CarName}</th>
                        </tr>
                        <tr>
                            <td>Average MPG</td>
                            <td>{mpgResults[0].CombMPG}</td>
                            <td>{mpgResults[1].CombMPG}</td>
                        </tr>
                        <tr>
                            <td>Highway MPG</td>
                            <td>{mpgResults[0].HwyMPG}</td>
                            <td>{mpgResults[1].HwyMPG}</td>
                        </tr>
                        <tr>
                            <td>City MPG</td>
                            <td>{mpgResults[0].CityMPG}</td>
                            <td>{mpgResults[1].CityMPG}</td>
                        </tr>
                    </table>
                }
            </>
    )
}
