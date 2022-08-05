import React, { useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, ModalFooter, Row } from 'reactstrap'
import Import from '../../controller/Import'
import useAuth from '../../hooks/useAuth'
import { useToast } from '../../context/toastContext'

const ImportForm = props => {
	const {auth} = useAuth()
	const {setToastObj} = useToast()
	const [file, setFile] = useState(null)
	const [exclude, setExclude] = useState(false)
	const importClass = new Import(process.env.REACT_APP_API_URL, auth)

	async function save(event){
		event.preventDefault()

		await importClass.save_file(props.id_conta, file, exclude)
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
							<Label>Importar arquivo .ofx</Label>
							<Input 
								type="file" 
								multiple
								accept='application/ofx,.ofx'
								onChange={e => setFile(e.target.files)} 
							/>
						</FormGroup>
						<FormGroup check>
							<Input 
								type="checkbox" 
								onChange={e => setExclude(e.target.value)} 
							/>
							{' '}
							<Label check>Excluir esses dados do banco de dados?</Label>
						</FormGroup>
					</Col>
				</Row>
			</div>
			<ModalFooter>               
				<Button onClick={props.closeModal}>
                    Cancelar
				</Button>

				<Button
					color="primary"
					type='submit'
					onClick={event => save(event)}
				>
                    Importar
				</Button>
			</ModalFooter>
		</Form>
	)
}

export default ImportForm