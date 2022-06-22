import React, { useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import Modal from '../components/UI/Base/Modal/Modal'
import CardProgressIconTitle from '../components/UI/CardProgressIconTitle'
import CartaoForm from '../model/Forms/CartaoForm'

const TestView = () => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
        <section className='container'>
            <Row className="mb-5 pt-5">
              <Col xl="4" md="12" className='mb-md-4'>
                <CardProgressIconTitle
                cardClassName={"flex-row align-items-center"}
                title='Caixa'
                smallTitle='banco'
                icon='icon-caixa'
                bgColor='bg-caixa'
                max='1222'
                cartao
                onClick={() => setOpenModal(true)}
                />
                <Modal openModal={openModal} setOpenModal={setOpenModal} title={"Editar Cartão"}>
                    <CartaoForm 
                      title='Caixa'
                      smallTitle='banco'
                      icon='icon-caixa'
                      bgColor='bg-caixa'
                      max='1222'
                    />
                </Modal>
            </Col>
            </Row>
        </section>
    </>
  )
}

export default TestView