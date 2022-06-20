import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Card as CardBs, Row, Col } from 'reactstrap'
import CardHeader from './_CardHeader'
import CardBody from './_CardBody'

/**
 * Card
 * @param props 
 * @returns Card element with Body and Header
 */
const Card = props => {
    return (
        <CardBase className={`${props.className} ${props.bgColor ? props.bgColor : ""}`} onClick={props.onClick}>
            {props.title ? (
            <CardHeader className="bg-transparent border-bottom-0">
                <Row className="align-items-center">
                    <Col xl="auto">
                        <h6 className={`${props.bgColor ? "text-light" : ""} text-uppercase ls-1 mb-1`}>{props.smallTitle}</h6>
                        <h3 className={`${props.bgColor ? "text-white" : ""} mb-0`}>{props.title}</h3>
                    </Col>
                    <Col>
                        {props.rightNav}
                    </Col>
                </Row>
            </CardHeader>
            ) : ""}
            <CardBody>
                {props.children}
            </CardBody>
        </CardBase>
    )
}

Card.propTypes = {
    children: PropTypes.node.isRequired,
    /** ClassName of Card itself */
    className: PropTypes.string,
    /** Function of onClick in the Card */
    onClick: PropTypes.func,
    /** Title to Header section */
    title: PropTypes.string,
    /** Smaller Title for the Header section */
    smallTitle: PropTypes.string,
    //** Background color of the Card, if setted, CardHeader text is setted to White */
    bgColor: PropTypes.string,
    //** Right Nav in Header section */
    rightNav: PropTypes.element
}

Card.defaultProps = {
    children: <p>Not Loaded</p>
}

const CardBase = styled(CardBs)`
height: 100%;
position: relative;
display: flex;
flex-direction: column;
min-width: 0;
word-wrap: break-word;
background-color: var(--white);
background-clip: initial;
border: var(--border);
border-radius: var(--border-round);
box-shadow: var(--box-shadow) !important;
color: initial;
cursor: ${props => props.onClick ? "pointer" : "normal"}
`

export default Card