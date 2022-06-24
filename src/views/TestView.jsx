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
                value={0}
                max={1220}
                cartao
                onClick={() => setOpenModal(true)}
                footerLeft="Fatura Aberta"
                footerRigth="Vencimento: 16/04"
                />
                <Modal openModal={openModal} setOpenModal={setOpenModal} title={"Editar Cartão"}>
                    <CartaoForm 
                      id_cartao={2}
                      id_conta={1}
                      fechamento={12}
                      vencimento={20}
                      limite={2800}
                    />
                </Modal>
            </Col>
            </Row>
        </section>
    </>
  )
}

export default TestView