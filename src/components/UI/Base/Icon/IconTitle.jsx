import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import RoundIcon from './RoundIcon'

const IconTitle = props => {
    return (
        <Row className='mb-3 align-items-center'>
            <Col className="col-auto">
                <RoundIcon {...props} />
            </Col>
            <Col>
                <h6 className={`text-uppercase ls-1 mb-1`}>{props.smallTitle}</h6>
                <Row>
                    <h3 className={`col mb-0`}>{props.title}</h3>
                    {props.dataConclusao ? (
                        <h5 className='col ms-auto mb-0 text-end'>Concluir: {props.dataConclusao}</h5>
                    ) : ''}
                </Row>
            </Col>
        </Row>
    )
}

IconTitle.propTypes = {
    smallTitle: PropTypes.string,
    title: PropTypes.string.isRequired,
    /** Background color to the icon */
    bgColor: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    /** ClassName to the icon */
    className: PropTypes.string,
    dataConclusao: PropTypes.string
}

export default IconTitle