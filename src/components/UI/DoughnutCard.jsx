import React from 'react'
import PropTypes from 'prop-types'
import Card from './Base/Card/Card'
import Doughnut from '../../components/Charts/Doughnut/Doughnut'

const DoughnutCard = props => {
	return (
		<Card {...props}>
			{props.data.length ? (
				<Doughnut data={props.data} label={props.label} dataLabel={props.dataLabel} />
			) : (
				<p>Sem Registros</p>
			)}
		</Card>
	)
}

DoughnutCard.propTypes = {
	/** ClassName of Card itself */
	className: PropTypes.string,
	/** Function of onClick in the Card */
	onClick: PropTypes.func,
	/** Title to Header section */
	title: PropTypes.string.isRequired,
	/** Smaller Title for the Header section */
	smallTitle: PropTypes.string,
	//** Background color of the Card, if setted, CardHeader text is setted to White */
	bgColor: PropTypes.string,
	//** Right Nav in Header section */
	rightNav: PropTypes.element,
	/** Full Array of objects */
	data: PropTypes.array.isRequired,
	/** General property name of Label */
	label: PropTypes.string.isRequired,
	/** Array of the property name of each dataset */
	dataLabel: PropTypes.array.isRequired
}

export default DoughnutCard