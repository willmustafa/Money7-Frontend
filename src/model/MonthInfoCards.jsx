import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import InfoCard from '../components/UI/Base/Card/InfoCard/InfoCard'
import { useDate } from '../context/dateContext'
import Transacao from '../controller/Transacao'
import useAuth from '../hooks/useAuth'
import { useToast } from '../context/toastContext'

const MonthInfoCards = () => {
	const {auth} = useAuth()
	const {toastObj} = useToast()
	const transacaoClass = new Transacao(process.env.REACT_APP_API_URL, auth)

	const {date} = useDate()
	const [dados, setDados] = useState(transacaoClass.responseStructure_somaMensal())
	const [valoresPrevistos, setValoresPrevistos] = useState([])
	let balancoMensalPrevisto = 0

	useEffect(() => {
		transacaoClass.get_somaMensal({date: new Date(date).toISOString()})
			.then(res => setDados(res))
			.catch(err => console.error(err))
		transacaoClass.get_transacoesFuturas({date: new Date(date).toISOString()})			
			.then(res => {
				setValoresPrevistos({
					receitaPrevista: res.filter(transacao => parseFloat(transacao.valor) > 0)
						.map(transacao => transacao.valor)
						.reduce((partialSum, current) => partialSum + current, 0),
					despesaPrevista: res.filter(transacao => parseFloat(transacao.valor) < 0)
						.map(transacao => transacao.valor)
						.reduce((partialSum, current) => partialSum + current, 0),
				})
			})
			.catch(err => console.error(err))
	}, [date, toastObj])

	return (
		<Container fluid>
			<div className="header-body">
				<Row>
					<Col xl="3" xs="12" sm="12" md="6" className='mb-md-4'>
						<InfoCard
							title="Receita" 
							value={dados?.receita} 
							predicted={dados?.receita + valoresPrevistos.receitaPrevista}
							bgColor={'bg-success'} 
							icon={'coins'}
							percentageValue={dados?.receita_perc_last}
							text="Em relação ao mês anterior"
						/>
					</Col>
					<Col xl="3" xs="12" sm="12" md="6" className='mb-md-4'>
						<InfoCard
							isExpense={true}
							title="Despesa" 
							value={dados?.despesa} 
							predicted={dados?.despesa + valoresPrevistos.despesaPrevista}
							bgColor={'bg-danger'} 
							icon={'credit-card'}
							percentageValue={dados?.despesa_perc_last}
							text="Em relação ao mês anterior"
						/>
					</Col>
					<Col xl="3" xs="12" sm="12" md="6" className='mb-md-4'>
						<InfoCard
							title="Balanço do Mês" 
							value={dados?.saldo_atual} 
							predicted={balancoMensalPrevisto}
							percentageValue={dados?.balanco_perc_last}
							bgColor={'bg-primary'} 
							icon={'chart-line'}
						/>
					</Col>
					<Col xl="3" xs="12" sm="12" md="6" className='mb-md-4'>
						<InfoCard
							title="Saldo Total" 
							value={dados?.saldo_total} 
							bgColor={'bg-info'} 
							icon={'sack-dollar'}
							showFooter={false}
						/>
					</Col>
				</Row>
			</div>
		</Container>
	)
}

export default MonthInfoCards