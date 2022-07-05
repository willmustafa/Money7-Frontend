import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavLink from './NavLink.styled'

const NavLinkIconName = props => {
	return (
		<NavLink to={props.parent ? props.parent + props.path : props.path}>
			<FontAwesomeIcon icon={props.icon} /> 
			<span className="nav_name">{props.name}</span> 
		</NavLink>
	)
}

NavLinkIconName.propTypes = {
	parent: PropTypes.string,
	path: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
}

export default NavLinkIconName