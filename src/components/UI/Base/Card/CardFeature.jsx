import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const CardFeature = props => {
	return (
		<CardWrapper>
			<FontAwesomeIcon className='title' icon={props.icon} />
			<Title>{props.feature}</Title>
			<Desc>{props.description}</Desc>
		</CardWrapper>
	)
}

const CardWrapper = styled.div`
padding: 40px 10px;
text-align: center;
background-color: white;
-webkit-border-radius: 20px;
-moz-border-radius: 20px;
-ms-border-radius: 20px;
border-radius: 20px;
-webkit-transition: all 0.3s ease-in;
-o-transition: all 0.3s ease-in;
transition: all 0.3s ease-in;
`

const Title = styled.h6`
text-align: center;
margin-bottom: 18px;
font-size: 24px;
line-height: 28px;
font-weight: 700;
`

const Desc = styled.p`
text-align: center;
font-size: 18px;
line-height: 28px;
font-weight: 400;
`