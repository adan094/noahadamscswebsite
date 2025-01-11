export default function HeaderCell(props)
{
    return (
        <th id={props.id} style={props.selected?{color:"#02dfef"}:{color:"white"}}>{props.id}</th>
    )
}