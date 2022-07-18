import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, Input, InputGroup, Label, ModalFooter, Row } from 'reactstrap'
import Transacao from '../../controller/Transacao'
import { capitalize } from '../../utils/StringUtils'
import CurrencyInput from '../../components/UI/Base/Forms/CurrencyInput'
import Objetivo from '../../controller/Objetivo'
import { fixedValue2Decimals } from '../../utils/ValueUtils'
import useAuth from '../../hooks/useAuth'
import { useToast } from '../../context/toastContext'

const GuardarResgatarForm = (props) => {
	const {auth} = useAuth()
	const {setToastObj} = useToast()
	const transacaoClass = new Transacao(process.env.REACT_APP_API_URL, auth?.accessToken)
	const objetivoClass = new Objetivo(process.env.REACT_APP_API_URL, auth?.accessToken)

	const propsData = props.data ? props.data : {
		id: 0,
		valor: '',
		date: '',
		descricao: '',
		categoria: '',
		conta: ''
	}

	const [valor, setValor] = useState(propsData.valor ? fixedValue2Decimals(propsData.valor) : '0.00')
	const [date, setDate] = useState(propsData.date ? propsData.date : new Date())
	const [categoria, setCategoria] = useState(propsData.categoria ? propsData.categoria : 'dinheiro guardado')
	const [conta, setConta] = useState(propsData.conta ? propsData.conta : 1)


	const [categorias] = useState([{
		id_categoria: 'dinheiro guardado',
		nome: 'dinheiro guardado'
	},
	{
		id_categoria: 'dinheiro resgatado',
		nome: 'dinheiro resgatado'
	}])
	const [contas, setContas] = useState(objetivoClass.responseStructure())

	useEffect(()=>{
		objetivoClass.get()
			.then(res => setContas(res))
			.catch(err => console.error(err))
	},[])


	async function save(event, exclude){
		event.preventDefault()
		let valorFormatado = valor.indexOf(',') == -1 ? valor.replace(/[^\d]/g, '') : valor.replace(/[^\d]/g, '')/100

		if(Number.parseFloat(valor) > 0 && categoria == 'dinheiro resgatado') valorFormatado = valorFormatado*(-1)
		if(Number.parseFloat(valor) < 0 && categoria == 'dinheiro guardado') valorFormatado = Math.abs(valorFormatado)

		const data = {
			date,
			id_categoria: categoria,
			id_conta: conta,
			descricao: 'Dinheiro de objetivo',
			status: true,
			valor: valorFormatado,
		}
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
							<CurrencyInput className='form-control' value={valor} onChange={e=>setValor(e.target.value)}/>
						</FormGroup>
					</Col>
					<Col lg="12">
						<FormGroup>
							<Label>Data</Label>
							<Input placeholder="dd/mm/aaaa" type="date" value={date} onChange={e=>setDate(e.target.value)}/>
						</FormGroup>
					</Col>
					<Col lg="12">
						<FormGroup>
							<Label>Categoria</Label>
							<InputGroup>
								<Input className='col-8 text-capitalize' type="select" name='categoria' value={categoria} onChange={e=>setCategoria(e.target.value)}>
									{categorias.map(el => 
										<option value={el.id_categoria} key={el.id_categoria}>{capitalize(el.nome)}</option>
									)}
								</Input>
							</InputGroup>
						</FormGroup>
					</Col>
					<Col lg="12">
						<FormGroup>
							<Label>Objetivo</Label>
							<InputGroup>
								<Input type="select" name='conta' value={conta} onChange={e=>setConta(e.target.value)}>
									{contas.map(el => 
										<option value={el.id_conta} key={el.id_conta}>{el.titulo}</option>
									)}
								</Input>
							</InputGroup>
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

export default GuardarResgatarForm