import React from 'react'
import PropTypes from 'prop-types'
import Card from '../Card'
import InfoCardHeader from './_InfoCardHeader'
import InfoCardFooter from './_InfoCardFooter'

const InfoCard = props => {
	return (
		<Card 
			className="mb-4 mb-xl-0"
		>
			<InfoCardHeader 
				{...props}
			/>
			<InfoCardFooter
				value={props.percentageValue}
				text={props.text}
			/>
		</Card>
	)
}

InfoCard.propTypes = {
	/** Title of InfoCard */
	title: PropTypes.string.isRequired,
	/** Featured Value, without currence, will be formatted to double here */
	value: PropTypes.number.isRequired,
	/** Background color from icon */
	bgColor: PropTypes.string.isRequired,
	/** Icon from FontAwesome */
	icon: PropTypes.string.isRequired,
	/** Value in percentage, if lower than 0 it turns red and arrow down */
	percentageValue: PropTypes.number,
	/** Text to be displayed */
	text: PropTypes.string
}

InfoCard.defaultProps = {
	value: 0,
	percentageValue: 0
}

export default InfoCard