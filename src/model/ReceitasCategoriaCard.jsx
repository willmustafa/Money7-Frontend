import DoughnutCard from '../components/UI/DoughnutCard'
import React, { useEffect, useState } from 'react'
import { useDate } from '../context/dateContext'
import Transacao from '../controller/Transacao'
import useAuth from '../hooks/useAuth'

const ReceitasCategoriaCard = () => {
	const {auth} = useAuth()
	const transacaoClass = new Transacao(process.env.REACT_APP_API_URL, auth?.accessToken)

	const {date} = useDate()
	const [dados, setDados] = useState(transacaoClass.responseStructure_receitasPorCategoria())

	useEffect(() => {
		transacaoClass.get_receitasPorCategoria({date: new Date(date).toISOString()})
			.then(res => setDados(res))
			.catch(err => console.error(err))
	}, [date])

	return (
		<DoughnutCard title='Receitas por Categoria' data={dados} label="categoria" dataLabel={['valor']}/>
	)
}

export default ReceitasCategoriaCard