import React from 'react'
import PropTypes from 'prop-types'
import ProgressBar from './Base/Chart/ProgressBar'
import IconTitle from './Base/Icon/IconTitle'

const ProgressIconTitle = props => {
    return (
        <>
            <IconTitle {...props} />
            <ProgressBar value={props.value} max={props.max} cartao={props.cartao}/>
        </>
    )
}

ProgressIconTitle.propTypes = {
    icon: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    smallTitle: PropTypes.string,
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    cartao: PropTypes.bool
}

export default ProgressIconTitle