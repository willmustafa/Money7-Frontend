import Modal from 'components/UI/Base/Modal/Modal'
import CardProgressIconTitle from 'components/UI/CardProgressIconTitle'
import PlusCardModalOpenner from 'components/UI/PlusCardModalOpenner'
import { apiPath } from 'controller/apiPath'
import { fetchData } from 'controller/fetch'
import CartaoForm from 'model/Forms/CartaoForm'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { useDate } from 'context/dateContext';
import { getToken } from 'context/loginContext'

const CartoesView = () => {
    const {date} = useDate()

    const [dados, setDados] = useState([{
        id_cartao: 1,
        cartao: "",
        limite: 0,
        vencimento: 1,
        instituicao: {
            nome: "",
            cor: "",
            icone: "plus"
        }
    }])
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}${apiPath.cartoes}`)
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
                    modalTitle='Novo Cartão'
                    form={<CartaoForm />}
                    />
                </Col>
                {dados.map(item => {
                    return <CartaoInfo {...item} key={item.id_cartao} />
                })}
            </Row>
        </section>
    </>
  )
}

const CartaoInfo = props => {
    const [openModal, setOpenModal] = useState(false)

    return (
        <Col xl="4" md="12" className='mb-md-4'>
            <CardProgressIconTitle
            cardClassName={"flex-row align-items-center"}
            title={props.apelido ? props.apelido : props.cartao}
            smallTitle={props.cartao}
            icon={props.instituicao.icone}
            bgColor={props.instituicao.cor}
            max={props.limite}
            onClick={() => setOpenModal(true)}
            />
            <Modal openModal={openModal} setOpenModal={setOpenModal} title={"Editar Cartão"}>
                <CartaoForm {...props} />
            </Modal>
        </Col>
    )
}

export default CartoesView