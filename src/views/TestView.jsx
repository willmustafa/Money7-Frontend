import React, { useState } from 'react'
import { Col, Row } from 'reactstrap'
import {QRCodeSVG} from 'qrcode.react'
import {v4 as uuidv4} from 'uuid'

const TestView = () => {
	const [qrcode] = useState(uuidv4())

	return (
		<>
			<section className='container'>
				<Row className="mb-5 pt-5">
					<Col xl="4" md="12" className='mb-md-4'>
						<QRCodeSVG value={qrcode} />
					</Col>
				</Row>
			</section>
		</>
	)
}

export default TestView