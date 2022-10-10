import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, Input, InputGroup, Label, ModalFooter, Row } from 'reactstrap'
// import Select from 'react-select'
import Modal from '../../components/UI/Base/Modal/Modal'
import ContaForm from './ContaForm'
import CategoriaForm from './CategoriaForm'
import Conta from '../../controller/Conta'
import Categoria from '../../controller/Categoria'
import Transacao from '../../controller/Transacao'
import Tag from '../../controller/Tag'
import { capitalize } from '../../utils/StringUtils'
import { ISODateToUSDate } from '../../utils/ValueUtils'
import CurrencyInput from '../../components/UI/Base/Forms/CurrencyInput'
import useAuth from '../../hooks/useAuth'
import { useToast } from '../../context/toastContext'
import TagForm from './TagForm'

const TransacaoForm = (props) => {
	const {auth} = useAuth()
	const {setToastObj} = useToast()
	const contaClass = new Conta(process.env.REACT_APP_API_URL, auth)
	const categoriaClass = new Categoria(process.env.REACT_APP_API_URL, auth)
	const transacaoClass = new Transacao(process.env.REACT_APP_API_URL, auth)
	const tagClass = new Tag(process.env.REACT_APP_API_URL, auth)

	const [openModalCategoria, setOpenModalCategoria] = useState(false)
	const [openModalConta, setOpenModalConta] = useState(false)
	const [openModalTag, setOpenModalTag] = useState(false)

	const propsData = props.data ? props.data : {
		id: 0,
		valor: '',
		date: '',
		descricao: '',
		categoria: '',
		conta: '',
		tag: 0
	}

	const [modalTypeTitle] = useState(props.modalTypeTitle ? props.modalTypeTitle : 'despesa')
	const [valor, setValor] = useState(propsData.valor ? propsData.valor : '0.00')
	const [date, setDate] = useState(propsData.date ? ISODateToUSDate(propsData.date) : ISODateToUSDate(new Date()))
	const [descricao, setDescricao] = useState(propsData.descricao ? propsData.descricao: '')
	const [categoria, setCategoria] = useState(propsData.categoria ? propsData.categoria : 1)
	const [conta, setConta] = useState(propsData.conta ? propsData.conta : 1)
	const [conta2, setConta2] = useState(propsData.conta2 ? propsData.conta2 : 1)
	const [tag, setTag] = useState(propsData.tag ? propsData.tag : 0)

	const [categorias, setCategorias] = useState(categoriaClass.responseStructure())
	const [contas, setContas] = useState(contaClass.responseStructure())
	const [tags, setTags] = useState([])

	useEffect(()=>{
		categoriaClass.get()
			.then(res => {
				setCategorias(res)
				if(!propsData.categoria) setCategoria(res[0].id_categoria)
			})
			.catch(err => console.error(err))
	},[openModalCategoria])

	useEffect(()=>{
		tagClass.get()
			.then(res => {
				setTags(res)
				if(!propsData.tag) setTag('')
			})
			.catch(err => console.error(err))
	},[openModalTag])

	useEffect(()=>{
		if(modalTypeTitle != 'transferencia'){
			contaClass.get_contaCartao({contaObjetivo: true})
				.then(res => {
					setContas(res)
					if(!propsData.conta) setConta(res[0].id_conta)
				})
				.catch(err => console.error(err))
		} else {
			contaClass.get_contaCartao({contaObjetivo: true})
				.then(res => {
					setContas(res)
					if(!propsData.conta) setConta(res[0].id_conta)
				})
				.catch(err => console.error(err))
		}
	},[openModalConta])

	// const tagsObj = tags.map(el => {
	// 	return {
	// 		value: el.id,
	// 		label: el.nome
	// 	}
	// })

	async function save(event, exclude){
		event.preventDefault()
		
		let valorFormatted = valor.indexOf(',') == -1 ? valor.replace(/[^\d]/g, '') : valor.replace(/[^\d]/g, '')/100
		if (propsData.id == 0 && modalTypeTitle == 'despesa' && valorFormatted >= 0 ) valorFormatted = valorFormatted*(-1)

		const data = {
			date,
			id_categoria: categoria,
			id_conta: conta,
			descricao,
			status: true,
			valor: valor.indexOf('-') == -1 ? valorFormatted : valorFormatted* -1,
		}

		if(modalTypeTitle == 'transferencia') data.id_conta2 = conta2
		if(tag != '') data.tag = tag

		await transacaoClass.save(propsData.id, data, exclude)
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
							<Label>Data</Label>
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
					{modalTypeTitle != 'transferencia' ? (
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
					): ''}
					<Col lg="12">
						<FormGroup>
							<Label>{modalTypeTitle == 'transferencia' ? 'Saiu da ' : ''}Conta / Cartão / Objetivo</Label>
							<InputGroup>
								<Input type="select" name='conta' value={conta} onChange={e=>setConta(e.target.value)}>
									<optgroup label="Contas Bancárias">
										{contas.filter(el => !el.cartao && !el.contaObjetivo).map(el => 
											<option value={el.id_conta} key={el.id_conta}>{el.instituicao.nome}</option>
										)}      
									</optgroup>
									<optgroup label="Cartões de Crédito">
										{contas.filter(el => el.cartao && !el.contaObjetivo).map(el => 
											<option value={el.id_conta} key={el.id_conta}>Cartão: {el.instituicao.nome}</option>
										)}  
									</optgroup>
									<optgroup label="Objetivo">
										{contas.filter(el => el.contaObjetivo).map(el => 
											<option value={el.id_conta} key={el.id_conta}>{el.Objetivos[0].titulo}</option>
										)}  
									</optgroup>
								</Input>
								<Button className='col-4' onClick={() =>setOpenModalConta(true)}>Nova</Button>
							</InputGroup>
							<Modal openModal={openModalConta} setOpenModal={setOpenModalConta} title={'Editar Categoria'}>
								<ContaForm />
							</Modal>
						</FormGroup>
					</Col>
					{modalTypeTitle == 'transferencia' ? (
						<Col lg="12">
							<FormGroup>
								<Label>Entrou na Conta / Cartão / Objetivo</Label>
								<InputGroup>
									<Input type="select" name='conta' value={conta2} onChange={e=>setConta2(e.target.value)}>
										<optgroup label="Contas Bancárias">
											{contas.filter(el => !el.cartao && !el.contaObjetivo).map(el => 
												<option value={el.id_conta} key={el.id_conta}>{el.instituicao.nome}</option>
											)}      
										</optgroup>
										<optgroup label="Cartões de Crédito">
											{contas.filter(el => el.cartao && !el.contaObjetivo).map(el => 
												<option value={el.id_conta} key={el.id_conta}>Cartão: {el.instituicao.nome}</option>
											)}  
										</optgroup>
										<optgroup label="Objetivo">
											{contas.filter(el => el.contaObjetivo).map(el => 
												<option value={el.id_conta} key={el.id_conta}>{el.Objetivos[0].titulo}</option>
											)}  
										</optgroup>
									</Input>
									<Button className='col-4' onClick={() =>setOpenModalConta(true)}>Nova</Button>
								</InputGroup>
								<Modal openModal={openModalConta} setOpenModal={setOpenModalConta} title={'Editar Categoria'}>
									<ContaForm />
								</Modal>
							</FormGroup>
						</Col>
					): ''}
					{modalTypeTitle != 'transferencia' ? (
						<Col lg="12">
							<FormGroup>
								<Label>Tags</Label>
								{/* <Select
									isMulti
									name="tag"
									options={tagsObj}
									className="basic-multi-select"
									classNamePrefix="select"
									onChange={e=>setTag(e.map(el => el.id))}
									value={tagsObj.filter(el => el.value === tag)}
								/> */}
								<InputGroup>
									<Input className='col-8 text-capitalize' type="select" name='tag' value={tag} onChange={e=>setTag(e.target.value)}>
										<option value=''></option>
										{tags.map(el => 
											<option value={el.id} key={el.id}>{capitalize(el.nome)}</option>
										)}
									</Input>
									<Button className='col-4' onClick={() => setOpenModalTag(true)}>Nova</Button>
								</InputGroup>
								<Modal openModal={openModalTag} setOpenModal={setOpenModalTag} title={'Editar Tag'}>
									<TagForm />
								</Modal>
							</FormGroup>
						</Col>
					): ''}
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

export default TransacaoForm