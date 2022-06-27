import React, { useEffect, useState } from 'react'
import Card from '../components/UI/Base/Card/Card'
import { Col } from 'reactstrap'
import IconTitle from '../components/UI/Base/Icon/IconTitle'
import { currency_formatter } from '../utils/ValueUtils'
import { apiPath } from '../controller/apiPath'
import { useDate } from '../context/dateContext'
import axios from 'axios'

const ContasCard = () => {
    const {date} = useDate()
    const [dados, setDados] = useState([{
        id_conta: 1,
        apelido: null,
        saldo_atual: 500,
        instituicao: {
            nome: "Dinheiro",
            cor: "bg-success",
            icone: "money-bill"
        }
    }])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}${apiPath.minhasContas}?date=${(new Date(date)).toISOString()}`)
        .then(res => setDados(res.data))
        .catch(err => console.error(err))
    }, [date])

    return (
        <Card title="Minhas Contas">
            {dados.map((item, index) => {
                return <ContaInfo {...item} key={index} />
            })}
        </Card>
    )
}

const ContaInfo = props => {
    return (
        <>
            <IconTitle
            title={props.instituicao.nome}
            smallTitle={props.apelido ? props.apelido : props.instituicao.nome}
            bgColor={props.instituicao.cor}
            icon={props.instituicao.icone}
            />
            <Col md="12" className='d-flex mb-4'>
                <h4>Saldo Atual</h4>
                <h4 className='ms-auto text-success'>{currency_formatter(props.saldo_atual)}</h4>
            </Col>
        </>
    )
}

export default ContasCard