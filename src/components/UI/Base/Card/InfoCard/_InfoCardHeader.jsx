import React from 'react'
import PropTypes from 'prop-types'
import RoundIcon from '../../Icon/RoundIcon'
import { Col, Row } from 'reactstrap'
import { currency_formatter } from '../../../../../utils/ValueUtils'

const _InfoCardHeader = props => {
    return (
        <Row>
            <Col>
                <h5 className="text-uppercase text-muted mb-0">{props.title}</h5>
                <h2 className="font-weight-bold mb-0">{currency_formatter(props.value)}</h2>
            </Col>
            <Col md="auto">
                <RoundIcon 
                {...props}
                />
            </Col>
        </Row>
    )
}

_InfoCardHeader.propTypes = {
    /** Title of InfoCard */
    title: PropTypes.string.isRequired,
    /** Featured Value, without currence, will be formatted to double here */
    value: PropTypes.number.isRequired,
    /** Background color from icon */
    bgColor: PropTypes.string.isRequired,
    /** Icon from FontAwesome */
    icon: PropTypes.string.isRequired
}

export default _InfoCardHeader