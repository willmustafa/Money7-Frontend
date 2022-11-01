import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, Input, InputGroup, Label, ModalFooter, Row } from 'reactstrap'
// import Select from 'react-select'
import Modal from '../../components/UI/Base/Modal/Modal'
import CategoriaForm from './CategoriaForm'
import Categoria from '../../controller/Categoria'
import Transacao from '../../controller/Transacao'
import { capitalize } from '../../utils/StringUtils'
import { ISODateToUSDate } from '../../utils/ValueUtils'
import CurrencyInput from '../../components/UI/Base/Forms/CurrencyInput'
import useAuth from '../../hooks/useAuth'
import { useToast } from '../../context/toastContext'

const TransacoesFuturasForm = (props) => {
	const {auth} = useAuth()
	const {setToastObj} = useToast()
	const categoriaClass = new Categoria(process.env.REACT_APP_API_URL, auth)
	const transacaoClass = new Transacao(process.env.REACT_APP_API_URL, auth)

	const [openModalCategoria, setOpenModalCategoria] = useState(false)

	const propsData = props.data ? props.data : {
		id: 0,
		dataPrevista: '',
		descricao: '',
		categoria: '',
		valor: '',
	}

	const [modalTypeTitle] = useState(props.modalTypeTitle ? props.modalTypeTitle : 'despesa')
	const [valor, setValor] = useState(propsData.valor ? propsData.valor : '0.00')
	const [date, setDate] = useState(propsData.dataPrevista ? ISODateToUSDate(propsData.dataPrevista) : ISODateToUSDate(new Date()))
	const [descricao, setDescricao] = useState(propsData.descricao ? propsData.descricao: '')
	const [categoria, setCategoria] = useState(propsData.categoria ? propsData.categoria : 1)

	const [categorias, setCategorias] = useState(categoriaClass.responseStructure())

	useEffect(()=>{
		categoriaClass.get()
			.then(res => {
				setCategorias(res)
				if(!propsData.categoria) setCategoria(res[0].id_categoria)
			})
			.catch(err => console.error(err))
	},[openModalCategoria])

	async function save(event, exclude){
		event.preventDefault()
		
		let valorFormatted = valor.indexOf(',') == -1 ? valor.replace(/[^\d]/g, '') : valor.replace(/[^\d]/g, '')/100
		if (propsData.id == 0 && modalTypeTitle == 'despesa' && valorFormatted >= 0 ) valorFormatted = valorFormatted*(-1)

		const data = {
			dataPrevista: date,
			descricao,
			id_categoria: categoria,
			valor: valor.indexOf('-') == -1 ? valorFormatted : valorFormatted* -1,
		}

		await transacaoClass.update_transacoesFuturas(propsData.id, data, exclude)
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
							<Label>Valor</Label>
							<CurrencyInput className='form-control' value={valor.replace('.',',')} onChange={e=>setValor(e.target.value)}/>
						</FormGroup>
					</Col>
					<Col lg="12">
						<FormGroup>
							<Label>Data {props.dataPrevista}</Label>
							<Input placeholder="dd/mm/aaaa" type="date" value={date} onChange={e=>setDate(e.target.value)}/>
						</FormGroup>
					</Col>
					{modalTypeTitle != 'transferencia' ? (
						<Col lg="12">
							<FormGroup>
								<Label>Descrição</Label>
								<Input placeholder="Alpiste para passarinho" type="text" value={descricao} onChange={e=>setDescricao(e.target.value)} />
							</FormGroup>
						</Col>
					) : ''}
					<Col lg="12">
						<FormGroup>
							<Label>Categoria</Label>
							<InputGroup>
								<Input className='col-8 text-capitalize' type="select" name='categoria' value={categoria} onChange={e=>setCategoria(e.target.value)}>
									{categorias.map(el => 
										<option value={el.id_categoria} key={el.id_categoria}>{capitalize(el.nome)}</option>
									)}
								</Input>
								<Button className='col-4' onClick={() => setOpenModalCategoria(true)}>Nova</Button>
							</InputGroup>
							<Modal openModal={openModalCategoria} setOpenModal={setOpenModalCategoria} title={'Editar Categoria'}>
								<CategoriaForm />
							</Modal>
						</FormGroup>
					</Col>
					
				</Row>
			</div>
			<ModalFooter>
				{propsData.id !== 0 ? (                
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

export default TransacoesFuturasForm