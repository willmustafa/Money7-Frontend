import React, { useEffect, useState } from 'react'
import { Alert } from 'reactstrap'
import { useDate } from '../context/dateContext'
import Objetivo from '../controller/Objetivo'
import useAuth from '../hooks/useAuth'
import { currency_formatter } from '../utils/ValueUtils'

const ObjetivoInfo = () => {
	const {auth} = useAuth()
	const {date} = useDate()
	const Objetivo_model = new Objetivo(process.env.REACT_APP_API_URL, auth?.accessToken)

	const [dados, setDados] = useState()

	useEffect(() => {
		Objetivo_model.get({date: new Date(date).toISOString()})
			.then(res => {
				setDados(res
					.map(el => Objetivo_model.precisaEconomizarCalc(el.saldo_atual, el.valor_total, el.date))
					.reduce((prev, curr) => prev + curr, 0)
				)
			})
			.catch(err => console.error(err))
	}, [])

	return (
		<Alert color='info'>Você precisa economizar {currency_formatter(dados)} por mês para atingir todos os seus objetivos.</Alert>
	)
}

export default ObjetivoInfo