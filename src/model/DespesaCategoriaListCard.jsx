import DoughnutCard from '../components/UI/DoughnutCard'
import React, { useEffect, useState } from 'react'
import { useDate } from '../context/dateContext'
import Transacao from '../controller/Transacao'
import useAuth from '../hooks/useAuth'
import { useToast } from '../context/toastContext'

const DespesaCategoriaListCard = () => {
	const {auth} = useAuth()
	const {toastObj} = useToast()
	const transacaoClass = new Transacao(process.env.REACT_APP_API_URL, auth?.accessToken)

	const {date} = useDate()
	const [dados, setDados] = useState(transacaoClass.responseStructure_despesasPorCategoria())

	useEffect(() => {
		transacaoClass.get_despesasPorCategoria({date: new Date(date).toISOString()})
			.then(res => setDados(res))
			.catch(err => console.error(err))
	}, [date, toastObj])

	return (
		<DoughnutCard title='Despesas por Categoria' data={dados} label="categoria" dataLabel={['valor']}/>
	)
}

export default DespesaCategoriaListCard