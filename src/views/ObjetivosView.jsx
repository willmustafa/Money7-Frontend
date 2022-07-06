import Modal from '../components/UI/Base/Modal/Modal'
import CardProgressIconTitle from '../components/UI/CardProgressIconTitle'
import PlusCardModalOpenner from '../components/UI/PlusCardModalOpenner'
import ObjetivoForm from '../model/Forms/ObjetivoForm'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { useDate } from '../context/dateContext'
import Objetivo from '../controller/Objetivo'
import useAuth from '../hooks/useAuth'

const ObjetivosView = () => {
	const {auth} = useAuth() 
	const objetivoClass = new Objetivo(process.env.REACT_APP_API_URL, auth?.accessToken)
	const {date} = useDate()
	const [dados, setDados] = useState(objetivoClass.responseStructure())  

	useEffect(() => {
		objetivoClass.get({date: new Date(date).toISOString()})
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
							modalTitle='Novo Objetivo'
							form={<ObjetivoForm />}
						/>
					</Col>
					{dados.map((item) => {
						return <ObjetivosCard {...item} key={item.id_objetivo} />
					})}
				</Row>
			</section>
		</>
	)
}

const ObjetivosCard = item => {
	const objetivoClass = new Objetivo()
	const [openModal, setOpenModal] = useState(false)

	return (
		<Col xl="4" md="12" className='mb-md-4'>
			<CardProgressIconTitle
				title={item.titulo}
				smallTitle={item.categoria.nome}
				icon={item.categoria.icone}
				bgColor={item.cor}
				value={item.saldo_atual}
				max={item.valor_total}
				dataConclusao={new Date(item.date).toLocaleDateString('pt-br')}
				cardClassName="flex-row align-items-center"
				onClick={() => setOpenModal(true)}
				cartao
				footerLeft={`${objetivoClass.precisaEconomizar(item.saldo_atual, item.valor_total, item.date)}`}
			/>
			<Modal openModal={openModal} setOpenModal={setOpenModal} title={'Editar Objetivo'}>
				<ObjetivoForm {...item} />
			</Modal>
		</Col> 
	)
}

export default ObjetivosView