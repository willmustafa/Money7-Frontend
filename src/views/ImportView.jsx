import PlusCardModalOpenner from '../components/UI/PlusCardModalOpenner'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { useDate } from '../context/dateContext'
import Conta from '../controller/Conta'
import useAuth from '../hooks/useAuth'
import ImportForm from '../model/Forms/ImportForm'

const ImportView = () => {
	const {auth} = useAuth()
	const contaClass = new Conta(process.env.REACT_APP_API_URL, auth.accessToken)

	const {date} = useDate()
	const [dados, setDados] = useState(contaClass.responseStructure())
    
	useEffect(() => {
		contaClass.get_contaCartao()
			.then(res => setDados(res))
			.catch(err => console.error(err))

	}, [date])

	return (
		<>
			<div className="main-header">
			</div>
			<section className='mt-n-7 container'>
				<Row className="mb-5">
					<h1 className='hero-image fw-bold'>Contas</h1>
					{dados.filter(el => !el.cartao).map((item, index) => {
						return <ContaInfo {...item} key={index} />
					})}
				</Row>
				<Row className="mb-5">
					<h1 className='fw-bold'>Cartões</h1>
					{dados.filter(el => el.cartao).map((item, index) => {
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
				form={<ImportForm {...props} />}
			>
			</PlusCardModalOpenner>
		</Col>
	)
}

export default ImportView