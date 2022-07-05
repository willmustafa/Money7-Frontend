import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const _CardHeader = props => {
	return (
		<CardHeader className={props.className}>
			{props.children}
		</CardHeader>
	)
}

_CardHeader.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string
}

_CardHeader.defaultProps = {
	children: <p>Not Loaded</p>
}

const CardHeader = styled.div`
padding: 1.25rem 1.5rem;
margin-bottom: 0;
background-color: var(--white);
border-bottom: 1px solid rgba(0,0,0,.05);
`

export default _CardHeader