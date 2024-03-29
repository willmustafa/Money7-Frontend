import React from 'react'
import styled from 'styled-components'
import { Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Media, Nav, Navbar as NavbarBs, Row, UncontrolledDropdown } from 'reactstrap'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InputDatePicker from '../../components/UI/Base/Forms/InputDatePicker'
import {routesArray} from '../../routes/routes'

const Navbar = styled(NavbarBs)`
position: absolute;
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: space-between;
padding: 1rem;
top: 0;
left: 0;
width: 100%;
z-index: 10;
`


const Header = () => {
	const location = useLocation()
	const username = localStorage.getItem('name') || 'Usuário'

	return (
		<Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
			<Container fluid>
				<Row>
					<Col className="d-table">
						<Link
							className="d-table-cell h4 mb-0 text-white text-uppercase align-middle"
							to="/dashboard"
						>
							{location.pathname == '/dashboard' ? 'Dashboard' : routesArray
								.filter(el => el.path == 'dashboard')
								.map(el => el.children
									.filter(el => el.path == location.pathname.replace('/', '')
										.split('/').pop())
									.map(el => el.name).pop())
								.pop()}
						</Link>
					</Col>
					<Col className="d-table">
						<div className="d-table-cell align-middle text-center">
							<InputDatePicker />
						</div>
					</Col>
					<Col>
						<Nav className="align-items-center d-none d-md-flex float-end dashboard" navbar>
							<UncontrolledDropdown nav>
								<DropdownToggle nav>
									<Media className="d-flex align-items-center">
										<span className="avatar avatar-sm rounded-circle">
										</span>
										<Media className="ms-2 d-none d-lg-block">
											<span className="mb-0 text-sm font-weight-bold">
												{username}
											</span>
										</Media>
									</Media>
								</DropdownToggle>
								<DropdownMenu className="dropdown-menu-arrow">
									<DropdownItem to="/dashboard/user" tag={Link}>
										<FontAwesomeIcon icon="user" />
										<span>Meu Perfil</span>
									</DropdownItem>
									<DropdownItem divider />
									<DropdownItem href="/dashboard/logout">
										<FontAwesomeIcon icon="arrow-right-from-bracket" />
										<span>Sair</span>
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						</Nav>
					</Col>
				</Row>
			</Container>
		</Navbar>
	)
}

export default Header