

export default function FuelEfficiencyRow(props)
{
    return (
        <tr>
            <td>{props.rank}</td>
            <td>{props.car["make"]}</td>
            <td>{props.car["model"]}</td>
            <td>{props.car["year"]}</td>
            <td>{props.car["comb08"]}</td>
            <td>{props.car["highway08"]}</td>
            <td>{props.car["city08"]}</td>
        </tr>
    )
}