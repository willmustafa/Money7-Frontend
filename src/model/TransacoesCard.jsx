import Card from '../components/UI/Base/Card/Card'
import React, { useEffect, useState } from 'react'
import { useDate } from '../context/dateContext'
import { currency_formatter, fixedValue2Decimals } from '../utils/ValueUtils'
import { Badge, FormGroup, Input, Label, Table } from 'reactstrap'
import RoundIcon from '../components/UI/Base/Icon/RoundIcon'
import Modal from '../components/UI/Base/Modal/Modal'
import TransacaoForm from './Forms/TransacaoForm'
import Transacao from '../controller/Transacao'
import GuardarResgatarForm from './Forms/GuardarResgatarForm'
import useAuth from '../hooks/useAuth'
import { useToast } from '../context/toastContext'

const TransacoesCard = props => {
	const {auth} = useAuth()
	const {toastObj} = useToast()
	const transacaoClass = new Transacao(process.env.REACT_APP_API_URL, auth)

	const [openModalTransacao, setOpenModalTransacao] = useState(false)
	const [openModalObjetivo, setOpenModalObjetivo] = useState(false)
	const [dados, setDados] = useState(transacaoClass.responseStructure())
	const {date} = useDate()
	const [rowData, setRowData] = useState({})
	const [hideObjetivos, setHideObjetivos] = useState(false)
	
	useEffect(()=>{
		transacaoClass.get({date: new Date(date).toISOString()})
			.then(res => setDados(res))
			.catch(err => console.error(err))
	},[date, toastObj])

	function editRow(event){
		const eventCell = Array.from(event.currentTarget.cells).map(item=>item.dataset.value)

		const rowInfo = {
			id: eventCell[0],
			contaObjetivo: eventCell[1],
			date: eventCell[2],
			descricao: eventCell[3],
			tag: eventCell[4],
			categoria: eventCell[5],
			conta: eventCell[6],
			valor: fixedValue2Decimals(eventCell[7]),
		}
		setRowData(rowInfo)

		setOpenModalTransacao(true)
	}

	let filteredTable = dados
		.filter(tabela => {
			if (props.searchInput === '')
				return tabela
	
			if (tabela?.descricao && String(tabela.descricao).toLowerCase().includes(props.searchInput) && !hideObjetivos && !tabela['conta.contaObjetivo'])
				return tabela
			
			if (tabela?.conta?.instituicao?.nome && String(tabela.conta.instituicao.nome).toLowerCase().includes(props.searchInput && !hideObjetivos && !tabela['conta.contaObjetivo']))
				return tabela
	
			if (tabela?.tag_nome && String(tabela.tag_nome).toLowerCase().includes(props.searchInput) && !hideObjetivos && !tabela['conta.contaObjetivo'])
				return tabela
	
			if (tabela?.categoria?.nome && String(tabela.categoria.nome).toLowerCase().includes(props.searchInput) && !hideObjetivos && !tabela['conta.contaObjetivo'])
				return tabela
		
		})

	if(hideObjetivos) filteredTable = filteredTable.filter(tabela => !tabela['conta.contaObjetivo'])

	return (  
		<>
			<Card title={'Transações'} rightNav={
				<div className='col-12 d-flex align-items-center'>
					<FormGroup check className='col-3 ms-auto align-self-end'>
						<Input 
							type="checkbox" 
							onChange={e => setHideObjetivos(e.target.checked)} 
						/>
						{' '}
						<Label check>Não exibir objetivos</Label>
					</FormGroup>
					<Input 
						type='text' 
						className='col-4 w-25'
						placeholder='Filtrar...' 
						onChange={(e) => props.setSearchInput(e.target.value)} />
				</div>
				
			}>
				<Table
					hover
					responsive
					striped>
					<thead>
						<tr>
							<th className='d-none'>id</th>
							<th>Data</th>
							<th>Descrição</th>
							<th className='d-none'>Tag</th>
							<th>Categoria</th>
							<th>Conta</th>
							<th>Valor</th>
						</tr>
					</thead>
					<tbody>
						{filteredTable.length ? (
							filteredTable.map(el=>{
								const length = el.descricao.length > 43 ? '...' : ''
								return(
									<tr key={el.id} onClick={editRow}>
										<td className='d-none' data-value={el.id}></td>
										<td className='d-none' data-value={el['conta.contaObjetivo']}></td>
										<td data-value={el.date}>{new Date(el.date).toLocaleDateString('pt-BR')}</td>
										<td data-value={el.descricao}>
											{el.descricao.substring(0, 43) + length}
											<Badge pill className='ms-2'>
												{el.tag_nome}
											</Badge>
										</td>
										<td className='d-none' data-value={el.id_tag}></td>
										<td data-value={el['categoria.id_categoria']}>{<RoundIcon className={'sm-icon'} bgColor={el['categoria.cor']} icon={el['categoria.icone']} />}{el['categoria.nome']}</td>
										{el['conta.contaObjetivo'] ? (
											<td data-value={el['conta.id_conta']}>{<RoundIcon className={'sm-icon'} bgColor={el.cor} icon={el['categoria.icone']} />}{el.titulo}</td>
										) : (
											<td data-value={el['conta.id_conta']}>{<RoundIcon className={'sm-icon'} bgColor={el['conta.instituicao.cor']} icon={el['conta.instituicao.icone']} />}{el['conta.id_cartao'] ? 'Cartão ' : ''}{el['conta.instituicao.nome']}</td>
										)}
										<td className={el.valor < 0 ? 'text-danger' : 'text-success'} data-value={el.valor}>{currency_formatter(el.valor)}</td>
									</tr>
								)
							})
						) : (
							<tr>
								<td>Sem Registros</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						)}
					</tbody>
				</Table>
			</Card>
			<Modal openModal={openModalTransacao} setOpenModal={setOpenModalTransacao} title={'Editar Transação'}>
				<TransacaoForm data={rowData} />
			</Modal>

			<Modal openModal={openModalObjetivo} setOpenModal={setOpenModalObjetivo} title={'Editar Objetivo'}>
				<GuardarResgatarForm data={rowData} />
			</Modal>
		</>
	)
}

export default TransacoesCard