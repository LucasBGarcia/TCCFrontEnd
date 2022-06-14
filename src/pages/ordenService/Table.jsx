import './Table.css'
// import { FaTrashAlt } from 'react-icons/fa';
// import { GrUpdate } from "react-icons/gr";


const refresh = () => {
    //e.stopPropagation(); 
    //console.log(e)
    console.log('HERE')
}


// eslint-disable-next-line import/no-anonymous-default-export
export default props => {
    return (
        <div className="table-wrapper">
            <table className="fl-table">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        {props.keys.map((h) => {
                            return <th>{h}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((line) => {
                        return <tr>
                            <td><button onClick={refresh()}></button></td>
                            <td><button></button></td>
                            {
                                props.keys.map((h) => {
                                    return (<td>{line[h]}</td>)
                                })
                            }</tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}
