import React, { useEffect } from 'react'
import { options, data } from './LineOptions'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line as LineChartJs } from 'react-chartjs-2';
  import PropTypes from 'prop-types'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const Line = props => {
    useEffect(()=>{
        data.labels = props.data.map(el => el[props.label]);
      
        for (let i = 0; i < props.dataLabel.length; i++) {
          data.datasets[i].data = props.data.map(el => el[props.dataLabel[i]]);
        }

    },[props])

    return (
        <LineChartJs data={data} options={options} redraw />
    )
}

Line.propTypes = {
    /** Full Array of objects */
    data: PropTypes.array.isRequired,
    /** General property name of Label */
    label: PropTypes.string.isRequired,
    /** Array of the property name of each dataset */
    dataLabel: PropTypes.array.isRequired
}

export default Line