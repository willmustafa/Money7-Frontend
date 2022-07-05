import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const _InfoCardFooter = props => {
	const value = props.value === null ? 0 : props.value
	return (
		<div className="mt-3 mb-0 text-muted d-block h5">
			<span className={`${value < 0 ? 'text-danger' : (value === 0 ? '' : 'text-success')} me-2`}>
				{value === 0 ? '' : <FontAwesomeIcon icon={value < 0 ? 'arrow-down' : 'arrow-up'} />}&nbsp;
				{value}%
			</span> 
			<span>{props.text}</span>
		</div>
	)
}

_InfoCardFooter.propTypes = {
	/** Value in percentage, if lower than 0 it turns red and arrow down */
	value: PropTypes.number.isRequired,
	/** Text to be displayed */
	text: PropTypes.string.isRequired
}

_InfoCardFooter.defaultProps = {
	value: 0,
	text: 'Em relação ao mês passado'
}

export default _InfoCardFooter