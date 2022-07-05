import React from 'react'
import {routesArray} from '../../routes/routes'

// Styled
import Navbar from './Navbar.styled'
import Nav from './Nav.styled'
import NavLink from './NavLink.styled'
import NavLinkIconName from './NavLinkIconName'

const getRoutes = (routes) => {
	return routes[1].children.filter(el => el.sidebar != false).map((prop, key) => {
		return (
			<NavLinkIconName {...prop} key={key}/>
		)
	})
}

const Sidebar = () => {
	return (
		<Navbar>
			<Nav>
				<div> 
					<NavLink to="/" className="mb-5"><img src={require('../../assets/img/brand/logo.png')} alt="" /></NavLink>
					<div className="nav_list mt-5"> 
						{getRoutes(routesArray)}
					</div>
				</div>
			</Nav>
		</Navbar>
	)
}

export default Sidebar