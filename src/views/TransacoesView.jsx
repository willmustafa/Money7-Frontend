import MonthInfoCards from '../model/MonthInfoCards'
import TransacoesCard from '../model/TransacoesCard'
import React from 'react'
import { Col, Container, Row } from 'reactstrap'

const TransacoesView = () => {
  return (
    <>
        <div className="main-header">
            <Container fluid>
                <div className="header-body">
                    <MonthInfoCards />
                </div>
            </Container>
        </div>
        <section className='mt-n-7 container'>
            <Row className="mb-5">
                <Col xl="12">
                    <TransacoesCard />
                </Col>
            </Row>
        </section>
    </>
  )
}

export default TransacoesView