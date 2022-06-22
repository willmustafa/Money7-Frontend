import PlusCardModalOpenner from '../components/UI/PlusCardModalOpenner'
import { apiPath } from '../controller/apiPath'
import ContaForm from '../model/Forms/ContaForm'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { currency_formatter } from '../utils/ValueUtils'
import { useDate } from '../context/dateContext'

const ContasView = () => {
    const {date} = useDate()
    const [dados, setDados] = useState([{
        id_conta: 1,
        date: "2022-05-01",
        saldo: 0,
        saldo_atual: 0,
        apelido: null,
        instituicao: {
            nome: "",
            cor: "",
            icone: "plus"
        }
    }])
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}${apiPath.minhasContas}?date=${(new Date(date)).toISOString()}`)
            .then(res => res.json())
            .then(res => setDados(res))
            .catch(err => console.error(err))
    }, [date])
    
  return (
    <>
        <div className="main-header">
        </div>
        <section className='mt-n-7 container'>
            <Row className="mb-5">
                <Col xl="4" md="12" className='mb-md-4'>
                    <PlusCardModalOpenner 
                    modalTitle='Nova Conta'
                    form={<ContaForm />}
                    />
                </Col>
                {dados.map((item, index) => {
                    return <ContaInfo {...item} key={index} />
                })}
            </Row>
        </section>
    </>
  )
}

const ContaInfo = props => {
    return (
        <Col xl="4" md="12" className='mb-md-4'>
            <PlusCardModalOpenner
            title={props.instituicao.nome}
            icon={props.instituicao.icone}
            bgColor={props.instituicao.cor}
            modalTitle='Editar Conta'
            form={<ContaForm {...props} />}
            >
                <Row className='mt-4'>
                    <Col className='d-flex'>
                        <h4>Saldo Atual</h4>
                        <h4 className='ms-auto text-success'>{currency_formatter(props.saldo_atual)}</h4>
                    </Col>
                </Row>
            </PlusCardModalOpenner>
        </Col>
    )
}

export default ContasView