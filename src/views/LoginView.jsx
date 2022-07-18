import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Col, Collapse, Container, Form, Input, Label, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, Row } from 'reactstrap'
import useAuth from '../hooks/useAuth'
import axios from 'axios'
import { CardFeature } from '../components/UI/Base/Card/CardFeature'
import {featureList} from '../infos/featureList'
import Modal from '../components/UI/Base/Modal/Modal'
import { HashLink } from 'react-router-hash-link'

const LoginView = () => {
	const { setAuth } = useAuth()

	const navigate = useNavigate()

	const errRef = useRef()
	
	const [username, setUsername] = useState('')
	const [user, setUser] = useState('')
	const [pwd, setPwd] = useState('')
	const [errMsg, setErrMsg] = useState('')
	const [modal, setModal] = useState(false)
	const [modalRegister, setModalRegister] = useState(false)
	const [scroll, setScroll] = useState(false)

	const changeHeaderBackground = () => {
		if (window.scrollY >= 80){
			setScroll(true)
		} else {
			setScroll(false)
		}
	}
	
	window.addEventListener('scroll', changeHeaderBackground)

	useEffect(() => {
		setErrMsg('')
	}, [user, pwd])

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`,
				JSON.stringify({ user, pwd }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true
				}
			)
			console.log(JSON.stringify(response?.data))

			const accessToken = response?.data?.accessToken
			setAuth({ user, accessToken })
			setUser('')
			setPwd('')
			navigate('/dashboard', { replace: true })
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response')
			} else if (err.response?.status === 400) {
				setErrMsg('Missing Username or Password')
			} else if (err.response?.status === 401) {
				setErrMsg('Unauthorized')
			} else {
				setErrMsg('Login Failed')
			}
			errRef.current.focus()
		}
	}

	const handleSubmitRegister = async (e) => {
		e.preventDefault()

		try {
			const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`,
				JSON.stringify({ user, pwd, username }),
				{
					headers: { 'Content-Type': 'application/json' },
				}
			)
			console.log(JSON.stringify(response?.data))
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response')
			} else if (err.response?.status === 400) {
				setErrMsg('Missing Username or Password')
			} else if (err.response?.status === 401) {
				setErrMsg('Unauthorized')
			} else {
				setErrMsg('Login Failed')
			}
			errRef.current.focus()
		}
	}

	return (
		<>
			<Container fluid>
				<Navbar
					className={`pt-3 pb-3 ${scroll ? 'active' : ''}`}
					expand="md"
					fixed="top"
					light
				>
					<Container className='d-flex'>
						<NavbarBrand href="/">
							<img className='brand-logo' src={require('../assets/img/brand/logo.png')} alt="" />
						</NavbarBrand>
						<NavbarToggler onClick={function noRefCheck(){}} />
						<Collapse navbar>
							<Nav
								className="ms-auto"
								navbar
							>
								<NavItem>
									<HashLink to="#recursos">
									Recursos
									</HashLink>
								</NavItem>
								<NavItem>
									<HashLink to="#sobre">
									Quem Somos
									</HashLink>
								</NavItem>
								<NavItem>
									<HashLink to="#planos">
									Planos e Preços
									</HashLink>
								</NavItem>
								<Button
									color={scroll ? 'dark' : 'light'}
									outline
									onClick={()=>setModal(true)}
								>Login</Button>
								<Button
									color={scroll ? 'dark' : 'light'}
									outline
									onClick={()=>setModalRegister(true)}
								>Registrar-se</Button>
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</Container>

			<Container fluid className='hero'>
				<Container>
					<Row>
						<Col lg='7'>
							<h6>Seguro - Rápido - Grátis!</h6>
							<h1>Controle financeiro automático e Simples!</h1>
							<p>Tenha um aplicativo que conecta automaticamente as suas contas bancárias e cartões e gerencie tudo em um só lugar.</p>
							<a href="#">
								<img className='hero-badge' src={require('../assets/img/icons/brand/google-play-badge.png')} />
							</a>
							<a href="#">
								<img className='hero-badge' src={require('../assets/img/icons/brand/download-app-store.png')} />
							</a>
						</Col>
						<Col lg='5'>
							<div className="hero-image">
								<img src={require('../assets/img/phone.png')} alt="banner"/>
							</div>
						</Col>
					</Row>
				</Container>
				<div className="hero-divider d-lg-block d-none">
					<img src={require('../assets/img/background-divider.png')} alt="css" />
				</div>
			</Container>

			<Container className='vh-100 d-flex align-items-center' id='recursos'>
				<div>
					<h4 className='subtitle text-center'>Recursos</h4>
					<h2 className='title fw-bold text-center'>Controle financeiro, definição de objetivos, planejamentos e muito mais!</h2>
					<Row className='align-items-center pt-5'>
						{featureList.map(el => (
							<Col md='3' key={el.id}>
								<CardFeature {...el}/>
							</Col>
						))}
					</Row>
				</div>
			</Container>

			<Container className='vh-100 align-items-center d-flex bg-linear-gradient-default position-relative' fluid id='sobre'>
				<div className="hero-divider-top d-lg-block d-none">
					<img src={require('../assets/img/background-divider-top.png')} alt="css" />
				</div>
				<Container>
					<Row className='align-items-center'>
						<Col lg='6'>
							<h4 className='subtitle fw-bold text-white'>Sobre esse Projeto</h4>
							<h2 className='title text-white'>Esse projeto foi criado para a minha pessoa foguete, <b>Thaila Nagazawa.</b></h2>
							<h4 className='description text-white'>Um designer incrível e boa de finanças, espero que esse site a ajude a ficar milionária.</h4>
							<a href='https://thailanagazawa.com.br/' target={'_blank'} rel="noreferrer">
								<Button size='lg' color='success' className='mt-3'>Conheça o portfólio dela!</Button>
							</a>
						</Col>
						<Col lg='6'>
							<div className='hero-image'>
								<img src={require('../assets/img/couple.png')} />
							</div>
						</Col>
					</Row>	
				</Container>
				<div className="hero-divider d-lg-block d-none">
					<img src={require('../assets/img/background-divider-2.png')} alt="css" />
				</div>
			</Container>

			<Container className='vh-100 align-items-center d-flex' fluid id='planos'>
				<Container>
					<Row className='align-items-center'>
						<Col lg='5'>
							<img src={require('../assets/img/coffee.png')} />
						</Col>
						<Col className='offset-1' lg='6'>
							<h4 className='subtitle fw-bold'>Planos e Preços</h4>
							<h2 className='title'>Esse é um projeto <b>Open Source</b> e será sempre <b>grátis!</b></h2>
							<h4 className='description'>Mas aceito doações para o meu café!</h4>
							<Button size='lg' color='success' className='mt-3'>Me faça um Pix!</Button>
						</Col>
					</Row>	
				</Container>
			</Container>

			<Modal openModal={modal} setOpenModal={setModal} title={'Fazer Login'}>
				<Container>
					<Col>
						<Form onSubmit={handleSubmit} method="POST">
							<Label>Email</Label>
							<Input 
								name="email" 
								type='email' 
								value={user} 
								onChange={el => setUser(el.target.value)}
								required
							/>
							<Label>Senha</Label>
							<Input 
								name="password" 
								type='password' 
								value={pwd} 
								onChange={el => setPwd(el.target.value)} 
								required
							/>
							<Button className='mt-4' color='primary'>Enviar</Button>
						</Form>
						<p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
					</Col>
				</Container>
			</Modal>

			<Modal openModal={modalRegister} setOpenModal={setModalRegister} title={'Registrar'}>
				<Container>
					<Col>
						<Form onSubmit={handleSubmitRegister} method="POST">
							<Label>Nome</Label>
							<Input 
								name="nome" 
								type='text' 
								value={username} 
								onChange={el => setUsername(el.target.value)}
								required
							/>
							<Label>Email</Label>
							<Input 
								name="email" 
								type='email' 
								value={user} 
								onChange={el => setUser(el.target.value)}
								required
							/>
							<Label>Senha</Label>
							<Input 
								name="password" 
								type='password' 
								value={pwd} 
								onChange={el => setPwd(el.target.value)} 
								required
							/>
							<Button className='mt-4' color='primary'>Enviar</Button>
						</Form>
						<p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
					</Col>
				</Container>
			</Modal>

			<footer className='bg-secondary'>
				<p className='text-center pt-2 pb-2 mb-0 text-white'><a className='text-white' href='https://github.com/willmustafa' target={'_blank'} rel="noreferrer">Criado por Willian Mustafa | Acesse meu Github</a></p>
			</footer>


		</>
	)
}

export default LoginView