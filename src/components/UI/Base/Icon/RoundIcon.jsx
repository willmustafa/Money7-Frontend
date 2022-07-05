import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const RoundIcon = props => {
	return (
		<Icon className={`${props.bgColor} ${props.className} text-white rounded-circle shadow`}>
			{props.icon.substring(0,4) === 'icon' ? (
				<i className={`${props.icon} custom-icon`} />
			):
				<FontAwesomeIcon icon={props.icon} />   
			}
		</Icon>
	)
}

RoundIcon.propTypes = {
	/** Background color from icon element, keep in mind that the icon is always white */
	bgColor: PropTypes.string.isRequired,
	/** Icon string from FontAwesome */
	icon: PropTypes.string.isRequired,
	/** Custom className to Icon round element */
	className: PropTypes.string
}

RoundIcon.defaultProps = {
	className: '',
	icon: 'circle'
}

const Icon = styled.div`
padding: 12px;
text-align: center;
display: inline-flex;
align-items: center;
justify-content: center;
border-radius: 50%;
width: 3rem;
height: 3rem;
`

export default RoundIcon