import BalancoCard from '../model/BalancoCard'
import ContasCard from '../model/ContasCard'
import DespesaCategoriaCard from '../model/DespesaCategoriaCard'
import MonthInfoCards from '../model/MonthInfoCards'
import ObjetivosCard from '../model/ObjetivosCard'
import ReceitaDespesaCard from '../model/ReceitaDespesaCard'
import ReceitasCategoriaCard from '../model/ReceitasCategoriaCard'
import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import { DesempenhoCard } from '../model/DesempenhoCard'

const DashboardView = () => {
	return (
		<>
			<div className="main-header">
				<Container fluid>
					<div className="header-body">
						<MonthInfoCards />
					</div>
				</Container>
			</div>
			<section className='mt-n-7 container'>
				<Row className="mb-xl-2">
					<Col xl="8" md="12" className='mb-md-4'>
						<BalancoCard />
					</Col>
					<Col xl="4" md="12" className='mb-md-4'>
						<ReceitaDespesaCard />
					</Col>
				</Row>
				<Row className="mb-xl-2">
					<Col xl="4" md="12" className='mb-md-4'>
						<DespesaCategoriaCard />
					</Col>
					<Col xl="4" md="12" className='mb-md-4'>
						<ReceitasCategoriaCard />
					</Col>
					<Col xl="4" md="12" className='mb-md-4'>
						<ContasCard />
					</Col>
				</Row>
				<Row className="mb-xl-2">
					<Col xl="6" md="12" className='mb-md-4'>
						<ObjetivosCard />
					</Col>
					<Col xl="6" md="12" className='mb-md-4'>
						<DesempenhoCard />
					</Col>
				</Row>
			</section>
		</>
	)
}

export default DashboardView