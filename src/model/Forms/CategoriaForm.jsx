import React, { useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, ModalFooter, Row } from 'reactstrap'
import ColorPicker from '../../components/UI/Base/Forms/ColorPicker'
import Categoria from '../../controller/Categoria'
import { capitalize } from '../../utils/StringUtils'
import useAuth from '../../hooks/useAuth'
import IconPicker from '../../components/UI/Base/Forms/IconPicker'
import { useToast } from '../../context/toastContext'

const CategoriaForm = (props) => {
	const {auth} = useAuth()
	const {setToastObj} = useToast()
	const categoriaClass = new Categoria(process.env.REACT_APP_API_URL, auth)

	const propsData = props.data ? props.data : {
		id_categoria: 0,
		nome: '',
		tipo: '',
		iconeArray: ['','']
	}

	const [nome, setNome] = useState(propsData.nome ? propsData.nome : '')
	const [tipo, setTipo] = useState(propsData.tipo ? capitalize(propsData.tipo) : 'Gastos Essenciais')
	const [icone, setIcone] = useState(propsData.iconeArray[1] ? propsData.iconeArray[1] :'plane')
	const [color, setColor] = useState(propsData.iconeArray[0] ? propsData.iconeArray[0] : 'bg-primary')


	async function save(event, exclude){
		event.preventDefault()
		const data = {
			nome,
			tipo,
			icone,
			cor: color,
			id_users: 1 // Alterar
		}

		await categoriaClass.save(propsData.id_categoria, data, exclude)
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
					<Col lg="12">
						<FormGroup>
							<Label>Tipo</Label>
							<Input name="tipo" type="select" value={tipo} onChange={e=>setTipo(e.target.value)}>
								<option value='Gastos Essenciais' >Gastos Essenciais</option>
								<option value='Gastos' >Gastos</option>
								<option value='Receitas' >Receitas</option>
								<option value='Investimento' >Investimento</option>
							</Input>
						</FormGroup>
					</Col>
					<Col lg="12">
						<FormGroup>
							<Label>Cor</Label>
							<ColorPicker colorPicked={color} setCheck={setColor} />
						</FormGroup>
					</Col>
					<Col lg="12">
						<FormGroup>
							<Label>Ícone</Label>
							<IconPicker iconPicked={icone} setCheck={setIcone} colorPicked={color} />
						</FormGroup>
					</Col>
				</Row>
			</div>
			<ModalFooter>
				{props.data && props.data.id_categoria !== 0 ? (                
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

export default CategoriaForm