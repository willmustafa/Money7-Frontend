import React, { useEffect } from 'react'
import { Col, Row } from 'reactstrap'
import Card from '../components/UI/Base/Card/Card'
import Transacao from '../controller/Transacao'
import useAuth from '../hooks/useAuth'
import { useDate } from '../context/dateContext'
import { useToast } from '../context/toastContext'
import { useState } from 'react'
import ObjetivoInfo from './ObjetivoInfo'

export const DesempenhoCard = () => {
	const {auth} = useAuth()
	const {date} = useDate()
	const {toastObj} = useToast()
	const Transacao_model = new Transacao(process.env.REACT_APP_API_URL, auth)

	const [dados, setDados] = useState()

	useEffect(() => {
		Transacao_model.get_desempenho({date: new Date(date).toISOString()})
			.then(res => setDados(res))
			.catch(err => console.error(err))
	}, [date,toastObj])

	return (
		<Card title={'Desempenho do Mês'}>
			<Row>
				<Col md="4">
					<h1 className='text-center'>{dados?.gastosEssenciais}%</h1>
					<h5 className='ms-auto text-center'>Gastos Essenciais</h5>
				</Col>
				<Col md="4">
					<h1 className='text-center'>{dados?.investimento}%</h1>
					<h5 className='ms-auto text-center'>Investimentos</h5>
				</Col>
				<Col md="4">
					<h1 className='text-center'>{dados?.gastos}%</h1>
					<h5 className='ms-auto text-center'>Gastos</h5>
				</Col>
			</Row>
			<Row className='mt-3'>
				<ObjetivoInfo />
			</Row>
		</Card>
	)
}
