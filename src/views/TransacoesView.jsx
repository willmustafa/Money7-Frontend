import MonthInfoCards from '../model/MonthInfoCards'
import TransacoesCard from '../model/TransacoesCard'
import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import FilteredInfoCards from '../model/FilteredInfoCards'
import { useState } from 'react'

const TransacoesView = () => {
	const [searchInput, setSearchInput] = useState('')
	const [hideObjetivos, setHideObjetivos] = useState(false)

	return (
		<>
			<div className="main-header">
				<Container fluid>
					<div className="header-body">
						{searchInput === '' ? (
							<MonthInfoCards />
						) : (
							<FilteredInfoCards searchInput={searchInput} />
						)}
					</div>
				</Container>
			</div>
			<section className='mt-n-7 container'>
				<Row className="mb-5">
					<Col xl="12">
						<TransacoesCard 
							setSearchInput={setSearchInput} 
							searchInput={searchInput} 
							hideObjetivos={hideObjetivos}
							setHideObjetivos={setHideObjetivos}
						/>
					</Col>
				</Row>
			</section>
		</>
	)
}

export default TransacoesView