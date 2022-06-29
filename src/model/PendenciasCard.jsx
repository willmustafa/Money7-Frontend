import React, { useEffect, useState } from 'react'
import Card from '../components/UI/Base/Card/Card'
import { Col } from 'reactstrap'
import { currency_formatter } from '../utils/ValueUtils'
import { useDate } from '../context/dateContext'
import Transacao from '../controller/Transacao'

const Pendencias = () => {
    const transacaoClass = new Transacao(process.env.REACT_APP_API_URL)

    const {date} = useDate()
    const [dados, setDados] = useState(transacaoClass.responseStructure_pendencias())
  
    useEffect(() => {
        transacaoClass.get_pendencias({date: new Date(date).toISOString()})
        .then(res => setDados(res))
        .catch(err => console.error(err))
    }, [date])
    
    return (
        <PendenciasCard {...dados}/>
    )
}

const PendenciasCard = props => {
    return (
        <Card title={"Pendências e Alertas"}>
            <Col md="12" className='d-flex'>
                <h4>Despesas Pendentes</h4>
                <h4 className='ms-auto text-danger'>{currency_formatter(props[0].despesa)}</h4>
            </Col>
            <Col md="12" className='d-flex'>
                <h4>Receitas Pendentes</h4>
                <h4 className='ms-auto text-success'>{currency_formatter(props[0].receita)}</h4>
            </Col>
        </Card>
    )
}

export default Pendencias