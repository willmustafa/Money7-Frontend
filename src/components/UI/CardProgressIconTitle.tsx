import React from 'react'
import PropTypes from 'prop-types'
import Card from './Base/Card/Card'
import ProgressIconTitle from './ProgressIconTitle'

const CardProgressIconTitle = props => {
    return (
        <Card title={props.cardTitle} className={props.cardClassName} onClick={props.onClick}>
            <ProgressIconTitle 
            {...props}
            />
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
    onClick: PropTypes.func
}

export default CardProgressIconTitle