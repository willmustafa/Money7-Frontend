import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, ModalFooter, Row } from 'reactstrap'
import ColorPicker from '../../components/UI/Base/Forms/ColorPicker'
import Categoria from '../../controller/Categoria'
import Objetivo from '../../controller/Objetivo'
import useAuth from '../../hooks/useAuth'
import { capitalize } from '../../utils/StringUtils'
import { useToast } from '../../context/toastContext'

const ObjetivoForm = props => {
	const {auth} = useAuth()
	const {setToastObj} = useToast()

	const categoriaClass = new Categoria(process.env.REACT_APP_API_URL, auth?.accessToken)
	const objetivoClass = new Objetivo(process.env.REACT_APP_API_URL, auth?.accessToken)

	const [check, setCheck] = useState(props.cor ? props.cor : 'bg-primary')
	const [id_objetivo] = useState(props.id_objetivo ? props.id_objetivo : 0)
	const [date, setDate] = useState(props.date)
	const [objetivo, setObjetivo] = useState(props.titulo)
	const [valor, setValor] = useState(props.valor_total)
	const [id_categoria, setIdCategoria] = useState(props.id_categoria ? props.id_categoria : 1)
	const [description, setDescription] = useState(props.description ? props.description : '')
	const [categorias, setCategorias] = useState(categoriaClass.responseStructure())

	useEffect(()=>{
		categoriaClass.get()
			.then(res => setCategorias(res))
			.catch(err => console.error(err))
	},[])

	async function save(event, exclude, finalizar){
		event.preventDefault()

		const data = {
			description,
			titulo: objetivo,
			valor,
			date,
			id_categoria,
			cor: check,
		}

		if (props.status == 'arquivado' || props.status == 'finalizado'){
			data.status = 'ativado'
		}
		if (props.status == 'ativado'){
			data.status = 'arquivado'
		}
		if (finalizar) data.status = 'finalizado'

		await objetivoClass.save(id_objetivo, data, exclude)
			.then(() => setToastObj({text: 'Salvo com sucesso!', type: 'success'}))
			.catch((error) => setToastObj({text: 'Um problema ocorreu.' + error, type: 'warning'}))
			.finally(()=> props.closeModal())
	}

	return (
		<Form>
			<div>
				<Row className="row">
					<Col lg="12">
						<FormGroup>
							<Label>Nome do Objetivo</Label>
							<Input name="nomeObjetivo" placeholder="Viagem para Tóquio" type="text" value={objetivo} onChange={(e)=>setObjetivo(e.target.value)} />
						</FormGroup>
					</Col>
					<Col lg="12">
						<FormGroup>
							<Label>Categoria</Label>
							<Input type="select" value={id_categoria} onChange={(e)=>setIdCategoria(e.target.value)}>
								{categorias.map(el => 
									<option 
										value={el.id_categoria} 
										key={el.id_categoria} 
									>
										{capitalize(el.nome)}
									</option>
								)}
							</Input>
						</FormGroup>
					</Col>
					<ColorPicker colorPicked={check} setCheck={setCheck} />
					<Col lg="12">
						<FormGroup>
							<Label>Data para atingir o objetivo</Label>
							<Input placeholder="dd/mm/aaaa" type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
						</FormGroup>
					</Col>
					<Col lg="12">
						<FormGroup>
							<Label>Valor</Label>
							<Input placeholder="0,00" type="number" value={valor} onChange={(e)=>setValor(e.target.value)}  />
						</FormGroup>
					</Col>
					<Col lg="12">
						<FormGroup>
							<Label>Anotações</Label>
							<Input type='textarea' name='description' value={description} onChange={e=>setDescription(e.target.value)} />
						</FormGroup>
					</Col>
				</Row>
			</div>
			<ModalFooter>
				<div className='me-auto'>
					{id_objetivo !== 0 ? (                
						<Button
							color="danger"
							onClick={event => save(event, true)}
						>
                        Excluir
						</Button>) : ''}
					{id_objetivo !== 0 ? (                
						<Button
							className='ms-2'
							color="info"
							onClick={event => save(event)}
						>
							{props.status == 'ativado' ? 'Arquivar' : 'Ativar'}
						</Button>) : ''}
					{(id_objetivo !== 0 && props.status != 'finalizado') ? (                
						<Button
							className='ms-2'
							color="info"
							onClick={event => save(event, null, 'finalizado')}
						>
							Finalizar
						</Button>) : ''}
				</div>

               
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

ObjetivoForm.defaultProps = {
	titulo: '',
	valor_total: '',
}

export default ObjetivoForm