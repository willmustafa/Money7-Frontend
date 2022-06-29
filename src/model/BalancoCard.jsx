import React, { useEffect, useState } from 'react'
import Card from '../components/UI/Base/Card/Card'
import Line from '../components/Charts/Line/Line'
import { useDate } from '../context/dateContext';
import Transacao from '../controller/Transacao';

const BalancoCard = props => {
    const transacaoClass = new Transacao(process.env.REACT_APP_API_URL)

    const {date} = useDate()
    const [dados, setDados] = useState(transacaoClass.responseStructure_balancoMensal())

    useEffect(() => {
        transacaoClass.get_balancoMensal({date: new Date(date).toISOString()})
            .then(res => setDados(res))
            .catch(err => console.error(err))
    }, [date])

    return (
        <Card title="Balanço" smallTitle="Relatório" bgColor="bg-gradient-default">
            <Line data={dados} label="date" dataLabel={["saldo"]}/>
        </Card>
    )
}

export default BalancoCard