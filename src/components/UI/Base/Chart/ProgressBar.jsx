import React from 'react'
import PropTypes from 'prop-types'
import { Col, Progress, Row } from 'reactstrap'
import { currency_formatter_abs } from '../../../../utils/ValueUtils'

const ProgressBar = props => {
    return (
        <Row className={`${props.className} ${props.cartao ? "mb-5" : ""}`}>
            <Col>
                <Progress 
                    {...Array(props).map(({className, ...rest}) => rest)[0]}
                />
                <h5 className='mt-2'>
                    {props.cartao ? "Limite: " : ""}{currency_formatter_abs(props.value)} de {currency_formatter_abs(props.max)}
                </h5>
            </Col>
        </Row>
    )
}

ProgressBar.propTypes = {
    /** ClassName will be applied to the Row element */
    className: PropTypes.string,
    /** Max value, the number to be achieved */
    max: PropTypes.number.isRequired,
    /** Current value */
    value: PropTypes.number.isRequired,
    /** Animation to progress bar, see reactstrap website */
    animated: PropTypes.bool,
    /** Add a stripe css */
    striped: PropTypes.bool,
    /** Background color (bg-*) */
    color: PropTypes.string,
    cartao: PropTypes.bool
}

ProgressBar.defaultProps = {
    max: 1,
    value: 0
}

export default ProgressBar