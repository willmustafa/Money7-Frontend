import React, { useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, ModalFooter, Row } from 'reactstrap'
import ColorPicker from '../../components/UI/Base/Forms/ColorPicker'
import Categoria from '../../controller/Categoria'
import { capitalize } from '../../utils/StringUtils'
import {iconList} from '../../components/UI/Base/Icon/iconList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useAuth from '../../hooks/useAuth'

const CategoriaForm = (props) => {
	const {auth} = useAuth()
	const categoriaClass = new Categoria(process.env.REACT_APP_API_URL, auth?.accessToken)

	const propsData = props.data ? props.data : {
		id_categoria: 0,
		nome: '',
		tipo: '',
		iconeArray: ['','']
	}

	const [nome, setNome] = useState(propsData.nome ? propsData.nome : '')
	const [tipo, setTipo] = useState(propsData.tipo ? capitalize(propsData.tipo) : '')
	const [icone, setIcone] = useState(propsData.iconeArray[1] ? propsData.iconeArray[1] :'')
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
							<Label>Ícone</Label>
							<Input type="select" name="icone" value={icone} onChange={e=>setIcone(e.target.value)}>
								{iconList.map((el, index) => 
									<option value={el} key={index}><FontAwesomeIcon icon={el} />{el}</option>
								)}
							</Input>
						</FormGroup>
					</Col>
					<ColorPicker colorPicked={color} setCheck={setColor} />
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