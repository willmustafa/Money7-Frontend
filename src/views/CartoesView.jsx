import Modal from '../components/UI/Base/Modal/Modal'
import CardProgressIconTitle from '../components/UI/CardProgressIconTitle'
import PlusCardModalOpenner from '../components/UI/PlusCardModalOpenner'
import { apiPath } from '../controller/apiPath'
import CartaoForm from '../model/Forms/CartaoForm'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { useDate } from '../context/dateContext';

const CartoesView = () => {
    const {date} = useDate()

    const [dados, setDados] = useState([{
        id_cartao: 3,
        limite: 1000,
        vencimento: 8,
        fechamento: 15,
        instituicao: {
            nome: "NuBank",
            cor: "bg-nubank",
            icone: "icon-nubank"
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
                title={props.instituicao.nome}
                smallTitle='Cartão'
                icon={props.instituicao.icone}
                bgColor={props.instituicao.cor}
                value={0}
                max={props.limite}
                cartao
                onClick={() => setOpenModal(true)}
                footerLeft="Fatura Aberta"
                footerRigth={`Vencimento: ${props.fechamento}/04`}
            />
            <Modal openModal={openModal} setOpenModal={setOpenModal} title={"Editar Cartão"}>
                <CartaoForm {...props} />
            </Modal>
        </Col>
    )
}

export default CartoesView