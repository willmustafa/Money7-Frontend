import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CardBody as CardBodyBs } from 'reactstrap';

const _CardBody = props => {
    return (
        <CardBody className={props.className}>
            {props.children}
        </CardBody>
    )
}

_CardBody.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
}

_CardBody.defaultProps = {
    children: <p>Not Loaded</p>
}

const CardBody = styled(CardBodyBs)`
padding: 1rem 1.5rem;
display: flex;
flex-direction: column;
`

export default _CardBody