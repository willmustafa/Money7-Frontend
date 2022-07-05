import React, { useEffect } from 'react'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { options, data } from './VerticalBarOptions.js'
import PropTypes from 'prop-types'

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
)

const VerticalBar = props => {

	useEffect(()=>{
		data.labels = props.data.map(el => el[props.label])
  
		for (let i = 0; i < props.dataLabel.length; i++) {
			data.datasets[i].data = props.data.map(el => el[props.dataLabel[i]])
		}
	},[props])

	return (
		<Bar options={options} data={data} redraw />
	)
}

VerticalBar.propTypes = {
	/** Full Array of objects */
	data: PropTypes.array.isRequired,
	/** General property name of Label */
	label: PropTypes.string.isRequired,
	/** Array of the property name of each dataset */
	dataLabel: PropTypes.array.isRequired
}

export default VerticalBar