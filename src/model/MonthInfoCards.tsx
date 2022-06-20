import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import InfoCard from 'components/UI/Base/Card/InfoCard/InfoCard'
import { fetchData } from 'controller/fetch'
import { apiPath } from 'controller/apiPath'
import { useDate } from 'context/dateContext';
import { getToken } from 'context/loginContext'

const MonthInfoCards = () => {
    const {date} = useDate()
    const [dados, setDados] = useState({
        receita: 0,
        despesa: 0,
        saldo_atual: 0,
        saldo_total: 0,
        receita_perc_last: 0,
        despesa_perc_last: 0
    })

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}${apiPath.somaMensal}?date=${date}`)
            .then(res => res.json())
            .then(res => setDados(res))
            .catch(err => console.error(err))
    }, [date])

    return (
        <Container fluid>
            <div className="header-body">
                <Row>
                    <Col xl="3" xs="12" sm="12" md="6" className='mb-md-4'>
                        <InfoCard
                            title="Receita" 
                            value={dados.receita} 
                            bgColor={"bg-success"} 
                            icon={"coins"}
                            percentageValue={dados.receita_perc_last}
                            text="Em relação ao mês anterior"
                        />
                    </Col>
                    <Col xl="3" xs="12" sm="12" md="6" className='mb-md-4'>
                        <InfoCard
                            title="Despesa" 
                            value={dados.despesa} 
                            bgColor={"bg-danger"} 
                            icon={"credit-card"}
                            percentageValue={dados.despesa_perc_last}
                            text="Em relação ao mês anterior"
                        />
                    </Col>
                    <Col xl="3" xs="12" sm="12" md="6" className='mb-md-4'>
                        <InfoCard
                            title="Balanço do Mês" 
                            value={dados.saldo_atual} 
                            bgColor={"bg-primary"} 
                            icon={"chart-line"}
                        />
                    </Col>
                    <Col xl="3" xs="12" sm="12" md="6" className='mb-md-4'>
                        <InfoCard
                            title="Saldo Total" 
                            value={dados.saldo_total} 
                            bgColor={"bg-info"} 
                            icon={"sack-dollar"}
                        />
                    </Col>
                </Row>
            </div>
        </Container>
    )
}

export default MonthInfoCards