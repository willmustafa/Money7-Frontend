import React from 'react'
import PropTypes from 'prop-types'
import Card from './Base/Card/Card'
import ProgressIconTitle from './ProgressIconTitle'
import { Col } from 'reactstrap'

const CardProgressIconTitle = props => {
	return (
		<Card title={props.cardTitle} className={props.cardClassName} onClick={props.onClick}>
			<ProgressIconTitle 
				{...props}
			/>
			{(props.footerLeft || props.footerRigth) ? (
				<div className={`${props.bgColor} card-footer-full-width`}>
					{props.footerLeft ? (
						<Col>
							{props.footerLeft}
						</Col>
					) : ''}
					{props.footerRigth ? (
						<Col className='ms-auto text-end'>
							{props.footerRigth}
						</Col>
					) : ''}
				</div>
			) : ''}
		</Card>
	)
}

CardProgressIconTitle.propTypes = {
	icon: PropTypes.string.isRequired,
	bgColor: PropTypes.string.isRequired,
	smallTitle: PropTypes.string,
	title: PropTypes.string.isRequired,
	value: PropTypes.number,
	max: PropTypes.number.isRequired,
	cardTitle: PropTypes.string,
	cardClassName: PropTypes.string,
	/** Function of onClick in the Card */
	onClick: PropTypes.func,
	cartao: PropTypes.bool,
	footerLeft: PropTypes.string,
	footerRigth: PropTypes.string
}

export default CardProgressIconTitle