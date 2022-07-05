import React, { useEffect, useState } from 'react'
import Card from '../components/UI/Base/Card/Card'
import Line from '../components/Charts/Line/Line'
import { useDate } from '../context/dateContext'
import Transacao from '../controller/Transacao'

const BalancoCard = () => {
	const transacaoClass = new Transacao(process.env.REACT_APP_API_URL)

	const {date} = useDate()
	const [dados, setDados] = useState(transacaoClass.responseStructure_balancoMensal())

	useEffect(() => {

		const fetchData = async () => {
			const data = await transacaoClass.get_balancoMensal({date: new Date(date).toISOString()})
			setDados(data.map(el => {
				return {
					date: el.month_number +'/'+ el.year,
					saldo: el.saldo
				}
			}))
		}

		fetchData()
			.catch(err => console.error(err))

	}, [date])

	return (
		<Card title="Balanço" smallTitle="Relatório" bgColor="bg-gradient-default">
			{dados != undefined ? (<Line data={dados} label="date" dataLabel={['saldo']}/>) : ''}
		</Card>
	)
}

export default BalancoCard