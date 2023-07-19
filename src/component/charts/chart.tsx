import { Chart } from "react-google-charts";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import _ from 'lodash';
import './chart.css'
import Sidebar from "../Menu/sideBar";

const Grafico = () => {

    let [list, setList] = useState([]);

    const loadData = (list) => {
        const values = _.groupBy(list, (value) => value.DeviceModel.devicemodel)
        const result = _.map(values, (value, key) => {
            return [
                key,
                values[key].length
            ]
        })

        return [["modelo", "quantidade"], ...result]


    }
    useEffect(() => {
        axios.get(`https://easycaixa.onrender.com/serviceorder`)
            .then((response) => {
                setList(response.data);
            })
    }, [])

    return (
        <div>
            <Sidebar />
            <h1 className="title">Quantidade de serviços por modelo</h1>
            <Chart
                chartType="PieChart"
                data={loadData(list)}
                width="100%"
                height="400px"
            />
        </div>
    )
}
export default Grafico