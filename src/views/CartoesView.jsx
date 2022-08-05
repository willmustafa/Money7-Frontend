import Modal from '../components/UI/Base/Modal/Modal'
import CardProgressIconTitle from '../components/UI/CardProgressIconTitle'
import PlusCardModalOpenner from '../components/UI/PlusCardModalOpenner'
import CartaoForm from '../model/Forms/CartaoForm'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { useDate } from '../context/dateContext'
import Cartao from '../controller/Cartao'
import useAuth from '../hooks/useAuth'
import { useToast } from '../context/toastContext'

const CartoesView = () => {
	const {auth} = useAuth()
	const {toastObj} = useToast()
	const cartaoClass = new Cartao(process.env.REACT_APP_API_URL, auth)

	const {date} = useDate()
	const [dados, setDados] = useState(cartaoClass.responseStructure())
    
	useEffect(() => {
		cartaoClass.get({date: new Date(date).toISOString()})
			.then(res => setDados(res))
			.catch(err => console.error(err))
	}, [date, toastObj])
    
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
				cardClassName={'flex-row align-items-center'}
				title={props.instituicao.nome}
				smallTitle='Cartão'
				icon={props.instituicao.icone}
				bgColor={props.instituicao.cor}
				value={props.saldo_atual}
				max={props.cartao.limite}
				cartao
				onClick={() => setOpenModal(true)}
				footerLeft="Fatura Aberta"
				footerRigth={`Vencimento: ${props.cartao.fechamento}/04`}
			/>
			<Modal openModal={openModal} setOpenModal={setOpenModal} title={'Editar Cartão'}>
				<CartaoForm {...props} />
			</Modal>
		</Col>
	)
}

export default CartoesView