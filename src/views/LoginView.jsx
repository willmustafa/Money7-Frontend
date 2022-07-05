import React, { useState } from 'react'
import { Button, Col, Container, Form, Input, Label } from 'reactstrap'
import { Navigate } from 'react-router-dom'
/* eslint-disable */
import { isAuthenticated, login } from '../context/loginContext'

const LoginView = () => {
	const [email, setEmail] = useState('willian2142@gmail.com')
	const [password, setPassword] = useState('123456789')
	const [auth, setAuth] = useState(isAuthenticated())

	function handleLogin(event){
		event.preventDefault()
		// fetchData(apiPath.login, {email, password}, {}).then(res => login(res.token, res.name, res.email, res.id)).then(() => setAuth(true));
	}    

	return (
		<>
			{auth ? <Navigate to="/dashboard" /> : (
				<Container>
					<Col>
						<Form onSubmit={handleLogin} method="POST">
							<Label>Email</Label>
							<Input name="email" type='email' value={email} onChange={el => setEmail(el.target.value)}/>
							<Label>Senha</Label>
							<Input name="password" type='password' value={password}  onChange={el => setPassword(el.target.value)} />
							<Button>Enviar</Button>
						</Form>
					</Col>
				</Container>

			)}
		</>
	)
}

export default LoginView