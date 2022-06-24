/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react'
import axios from "axios"


const Calcula = () => {

    let [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3333/serviceorder`)
            .then((response) => {
                setList(response.data);
                // console.log(response.data);
            })
    }, [])


    var functionSoma = list.map(function (data) {
        var soma = [data.value + data.value]
        // for (var i = 0; i < list.length; i++) {
        //     soma += data.value[i]
        // }
        return soma
    })
    console.log(functionSoma)

    // {
    //     list.map((data) =>
    //         console.log(data.id),
    //          for (let i = 0; i < data.length; i++)
    //         console.log(data.data[i])
    //     )
    // }


    return (
        <div>
            <h5>teste </h5>
        </div>
    )


}
export default Calcula;
// export default class Calcula extends Component {

//     getValues = async (data) => {
//         try {
//             await api.get("serviceorder", data)
//             console.log("aqui")
//         } catch (error) {
//             console.log(error.response.data);
//             alert(error.response.data)

//         }
//     };

//     render() {


//         return (
//             <div>
//                 <h5>{this.props.id}</h5>
//             </div>
//         )
//     }
// }
