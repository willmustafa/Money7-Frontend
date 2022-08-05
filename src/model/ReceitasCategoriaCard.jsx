import DoughnutCard from '../components/UI/DoughnutCard'
import React, { useEffect, useState } from 'react'
import { useDate } from '../context/dateContext'
import Transacao from '../controller/Transacao'
import useAuth from '../hooks/useAuth'
import { useToast } from '../context/toastContext'

const ReceitasCategoriaCard = () => {
	const {auth} = useAuth()
	const {toastObj} = useToast()
	const transacaoClass = new Transacao(process.env.REACT_APP_API_URL, auth)

	const {date} = useDate()
	const [dados, setDados] = useState(transacaoClass.responseStructure_receitasPorCategoria())

	useEffect(() => {
		transacaoClass.get_receitasPorCategoria({date: new Date(date).toISOString()})
			.then(res => setDados(res))
			.catch(err => console.error(err))
	}, [date, toastObj])

	return (
		<DoughnutCard title='Receitas por Categoria' data={dados} label="categoria" dataLabel={['valor']}/>
	)
}

export default ReceitasCategoriaCard