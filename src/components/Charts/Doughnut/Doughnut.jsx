import React, { useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut as DoughnutChartJs } from 'react-chartjs-2'
import PropTypes from 'prop-types'
import { capitalize } from '../../../utils/StringUtils'
import { ChartLabelFormatter } from '../../../utils/ValueUtils'

ChartJS.register(ArcElement, Tooltip, Legend)

const Doughnut = props => {
	const data = {
		labels: props.data.map(el => capitalize(el.categoria.nome)),
		datasets: [
			{
				data: [5, 10],
				backgroundColor: [
					'rgba(255, 99, 132, 0.8)',
					'rgba(54, 162, 235, 0.8)',
					'rgba(255, 206, 86, 0.8)',
					'rgba(75, 192, 192, 0.8)',
					'rgba(153, 102, 255, 0.8)',
					'rgba(255, 159, 64, 0.8)',
				],
			},
		]
	}

	const options = {
		responsive: true,
		defaultColor: '#fff',
		defaultFontColor: '#fff',
		defaultFontSize: 13,
		cutout: '90%',
		radius: '80%',
		plugins: {
			legend: {
				display: false
			},
			tooltip: { 
				callbacks: { label: ChartLabelFormatter } 
			} 
		}
	}

	useEffect(()=>{
		for (let i = 0; i < props.dataLabel.length; i++) {
			data.datasets[i].data = props.data.map(el => el[props.dataLabel[i]])
		}
	},[props])

	return (
		<DoughnutChartJs data={data} options={options} redraw/>
	)
}

Doughnut.propTypes = {
	/** Full Array of objects */
	data: PropTypes.array.isRequired,
	/** General property name of Label */
	label: PropTypes.string.isRequired,
	/** Array of the property name of each dataset */
	dataLabel: PropTypes.array.isRequired
}

export default Doughnut