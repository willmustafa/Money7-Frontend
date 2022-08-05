import React, { useEffect, useState } from 'react'
import ProgressIconTitle from '../components/UI/ProgressIconTitle'
import Card from '../components/UI/Base/Card/Card'
import { useDate } from '../context/dateContext'
import Objetivo from '../controller/Objetivo'
import useAuth from '../hooks/useAuth'
import { useToast } from '../context/toastContext'

const ObjetivosCard = () => {
	const {auth} = useAuth()
	const {toastObj} = useToast()
	const objetivoClass = new Objetivo(process.env.REACT_APP_API_URL, auth)
	const {date} = useDate()
	const [dados, setDados] = useState(objetivoClass.responseStructure())
    
	useEffect(() => {
		objetivoClass.get({date: new Date(date).toISOString(), limit: 3})
			.then(res => setDados(res))
			.catch(err => console.error(err))
	}, [date,toastObj])
    
	return (
		<Card title={'Objetivos'}>
			{dados.map((item) => {
				return <ProgressIconTitle
					title={item.titulo}
					smallTitle={item.categoria.nome}
					icon={item.categoria.icone}
					bgColor={item.cor}
					value={item.saldo_atual}
					max={item.valor_total}
					key={item.id_objetivo}
				/>
			})}
		</Card>
	)
}

export default ObjetivosCard