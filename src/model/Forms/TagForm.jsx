import React, { useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, ModalFooter, Row } from 'reactstrap'
import Tag from '../../controller/Tag'
import useAuth from '../../hooks/useAuth'
import { useToast } from '../../context/toastContext'

const TagForm = (props) => {
	const {auth} = useAuth()
	const {setToastObj} = useToast()
	const tagClass = new Tag(process.env.REACT_APP_API_URL, auth?.accessToken)

	const propsData = props.data ? props.data : {
		id: 0,
		nome: '',
	}

	const [nome, setNome] = useState(propsData.nome ? propsData.nome : '')


	async function save(event, exclude){
		event.preventDefault()
		const data = {
			nome,
			id_users: 1 // Alterar
		}

		await tagClass.save(propsData.id, data, exclude)
			.then(() => setToastObj({text: 'Salvo com sucesso!', type: 'success'}))
			.catch(() => setToastObj({text: 'Um problema ocorreu', type: 'warning'}))
			.finally(()=> props.closeModal())
	}

	return (
		<Form>
			<div>
				<Row className="row">
					<Col lg="12">
						<FormGroup>
							<Label>Nome</Label>
							<Input placeholder="Farmácia" type="text" value={nome} onChange={e=>setNome(e.target.value)} />
						</FormGroup>
					</Col>
				</Row>
			</div>
			<ModalFooter>
				{props.data && props.data.id !== 0 ? (                
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

export default TagForm