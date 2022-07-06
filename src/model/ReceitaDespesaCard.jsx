import VerticalBar from '../components/Charts/Bar/VerticalBar/VerticalBar'
import Card from '../components/UI/Base/Card/Card'
import React, { useEffect, useState } from 'react'
import { useDate } from '../context/dateContext'
import Transacao from '../controller/Transacao'
import useAuth from '../hooks/useAuth'

const ReceitaDespesaCard = () => {
	const {auth} = useAuth()
	const transacaoClass = new Transacao(process.env.REACT_APP_API_URL, auth?.accessToken)

	const {date} = useDate()
	const [dados, setDados] = useState(transacaoClass.responseStructure_gastosReceitasMensal())

	useEffect(() => {
		transacaoClass.get_gastosReceitasMensal({date: new Date(date).toISOString()})
			.then(res => setDados(res.map(el => {
				return {
					date: el.month_number +'/'+ el.year,
					despesa: el.despesa,
					receita: el.receita
				}
			})))
			.catch(err => console.error(err))
	}, [date])

	return (
		<Card title="Gastos e Receitas" smallTitle="Relatório">
			<VerticalBar data={dados} label="date" dataLabel={['receita', 'despesa']}/>
		</Card>
	)
}

export default ReceitaDespesaCard