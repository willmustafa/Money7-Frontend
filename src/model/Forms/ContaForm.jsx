import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, ModalFooter, Row } from 'reactstrap'
import Conta from '../../controller/Conta'
import Instituicao from '../../controller/Instituicao'
import useAuth from '../../hooks/useAuth'

const ContaForm = props => {
	const {auth} = useAuth()
	const contaClass = new Conta(process.env.REACT_APP_API_URL, auth?.accessToken)
	const instituicaoClass = new Instituicao(process.env.REACT_APP_API_URL, auth?.accessToken)

	const [id_conta] = useState(props.id_conta ? props.id_conta : 0)
	const [id_instituicao, setId_instituicao] = useState(props.id_instituicao)
	const [saldo, setSaldo] = useState(props.saldo ? props.saldo : 0)
	const [date, setDate] = useState(props.date ? props.date : '')

	const [instituicao, setInstituicao] = useState(instituicaoClass.responseStructure())

	useEffect(()=>{
		instituicaoClass.get()
			.then(res => setInstituicao(res))
			.catch(err => console.error(err))
	},[])

	async function save(event, exclude){
		event.preventDefault()
		const data = {
			date,
			saldo,
			id_instituicao,
			id_users: 1 // Alterar
		}

		await contaClass.save(id_conta, data, exclude)
			.then(data => console.log(data))
			.catch(error => console.log(error))
			.finally(()=> props.closeModal())
	}

	return (
		<Form>
			<div>
				<Row className="row">
					<Col lg="12">
						<FormGroup>
							<Label>Nome do Banco</Label>
							<Input type='select' value={props.id_instituicao} name="id_instituicao" onChange={(e)=>setId_instituicao(e.target.value)}>
								{instituicao.map(el => 
									<option 
										value={el.id_instituicao} 
										key={el.id_instituicao} 
									>
										{el.nome}
									</option>
								)}
							</Input>
						</FormGroup>
					</Col>
					<Col lg="12">
						<FormGroup>
							<Label>Data do inicio da conta</Label>
							<Input 
								name="date"
								placeholder="dd/mm/aaaa" 
								type="date" 
								value={date} 
								onChange={(e)=>setDate(e.target.value)}  
							/>
						</FormGroup>
					</Col>
					<Col lg="12">
						<FormGroup>
							<Label>Saldo inicial</Label>
							<Input 
								name="saldo"
								placeholder="0,00" 
								type="number" 
								value={saldo} 
								onChange={(e)=>setSaldo(e.target.value)} 
							/>
						</FormGroup>
					</Col>
				</Row>
			</div>
			<ModalFooter>
				{id_conta !== 0 ? (                
					<Button
						className='me-auto'
						color="danger"
						onClick={event => save(event, true)}
					>
                        Excluir
					</Button>) : ''}
               
				<Button onClick={props.closeModal}>
                    Cancelar
				</Button>

				<Button
					color="primary"
					type='submit'
					onClick={event => save(event)}
				>
                    Salvar
				</Button>
			</ModalFooter>
		</Form>
	)
}

export default ContaForm