import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import InfoCard from '../components/UI/Base/Card/InfoCard/InfoCard'
import { useDate } from '../context/dateContext'
import { useToast } from '../context/toastContext'
import Transacao from '../controller/Transacao'
import useAuth from '../hooks/useAuth'

const FilteredInfoCards = props => {
	const {auth} = useAuth()
	const {toastObj} = useToast()
	const transacaoClass = new Transacao(process.env.REACT_APP_API_URL, auth)
	const [dados, setDados] = useState(transacaoClass.responseStructure())
	const {date} = useDate()

	useEffect(()=>{
		transacaoClass.get({date: new Date(date).toISOString()})
			.then(res => setDados(res))
			.catch(err => console.error(err))
	},[date, toastObj])

	const filteredTable = dados.filter(tabela => {
		if (props.searchInput === '')
			return tabela

		if (tabela?.descricao && String(tabela.descricao).toLowerCase().includes(props.searchInput))
			return tabela
		
		if (tabela?.conta?.instituicao?.nome && String(tabela.conta.instituicao.nome).toLowerCase().includes(props.searchInput))
			return tabela

		if (tabela?.tag_nome && String(tabela.tag_nome).toLowerCase().includes(props.searchInput))
			return tabela

		if (tabela?.categoria?.nome && String(tabela.categoria.nome).toLowerCase().includes(props.searchInput))
			return tabela
	})

	const receitasArr = filteredTable
		.filter(el => el.valor > 0)
		.map(el => el.valor)
	const despesasArr = filteredTable
		.filter(el => el.valor < 0)
		.map(el => el.valor)

	const receitas = receitasArr.length > 0 ? receitasArr
		.reduce((prev, cur) => cur = prev + cur) : 0
	const despesas = despesasArr.length > 0 ? despesasArr
		.reduce((prev, cur) => cur = prev + cur) : 0

	return (
		<Container fluid>
			<div className="header-body">
				<Row>
					<Col xl="3" xs="12" sm="12" md="6" className='mb-md-4'>
						<InfoCard
							title="Receita Filtrada" 
							value={receitas} 
							bgColor={'bg-success'} 
							icon={'coins'}
						/>
					</Col>
					<Col xl="3" xs="12" sm="12" md="6" className='mb-md-4'>
						<InfoCard
							title="Despesa Filtrada" 
							value={despesas} 
							bgColor={'bg-danger'} 
							icon={'credit-card'}
						/>
					</Col>
					<Col xl="3" xs="12" sm="12" md="6" className='mb-md-4'>
						<InfoCard
							title="Balanço do Mês" 
							value={receitas - despesas} 
							bgColor={'bg-primary'} 
							icon={'chart-line'}
						/>
					</Col>
				</Row>
			</div>
		</Container>
	)
}

export default FilteredInfoCards