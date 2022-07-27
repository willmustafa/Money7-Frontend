import TagsCard from '../model/TagsCard'
import MonthInfoCards from '../model/MonthInfoCards'
import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import PlusCardModalOpenner from '../components/UI/PlusCardModalOpenner'
import TagForm from '../model/Forms/TagForm'

const TagsView = () => {
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
				<Row className="mb-5">
					<Col xl="4" md="12" className='mb-md-4'>
						<PlusCardModalOpenner 
							modalTitle='Nova Tag'
							form={<TagForm />}
						/>
					</Col>
					<Col xl="8">
						<TagsCard />
					</Col>
				</Row>
			</section>
		</>
	)
}

export default TagsView