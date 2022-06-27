import React, { useEffect, useState } from 'react'
import Card from '../components/UI/Base/Card/Card'
import Line from '../components/Charts/Line/Line'
import { apiPath } from '../controller/apiPath'
import { useDate } from '../context/dateContext';
import axios from 'axios';

const BalancoCard = props => {
    const {date} = useDate()
    const [dados, setDados] = useState([{
        date: "Janeiro",
        saldo: 800
    }])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}${apiPath.balancoMensal}?date=${(new Date(date)).toISOString()}`)
            .then(res => setDados(res.data))
            .catch(err => console.error(err))
    }, [date])

    return (
        <Card title="Balanço" smallTitle="Relatório" bgColor="bg-gradient-default">
            <Line data={dados} label="date" dataLabel={["saldo"]}/>
        </Card>
    )
}

export default BalancoCard