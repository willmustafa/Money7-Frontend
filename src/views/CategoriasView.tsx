import CategoriasCard from 'model/CategoriasCard'
import MonthInfoCards from 'model/MonthInfoCards'
import React from 'react'
import { Col, Container, Row } from 'reactstrap'

const CategoriasView = () => {
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
                    <CategoriasCard />
                </Col>
            </Row>
        </section>
    </>
  )
}

export default CategoriasView