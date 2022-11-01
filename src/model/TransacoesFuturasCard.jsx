import Card from '../components/UI/Base/Card/Card'
import React, { useEffect, useState } from 'react'
import { useDate } from '../context/dateContext'
import { currency_formatter, fixedValue2Decimals } from '../utils/ValueUtils'
import { Table } from 'reactstrap'
import RoundIcon from '../components/UI/Base/Icon/RoundIcon'
import Modal from '../components/UI/Base/Modal/Modal'
import Transacao from '../controller/Transacao'
import useAuth from '../hooks/useAuth'
import { useToast } from '../context/toastContext'
import TransacoesFuturasForm from './Forms/TransacoesFuturasForm'

const TransacoesFuturasCard = () => {
	const {auth} = useAuth()
	const {toastObj} = useToast()
	const transacaoClass = new Transacao(process.env.REACT_APP_API_URL, auth)

	const [openModalTransacao, setOpenModalTransacao] = useState(false)
	const [dados, setDados] = useState(transacaoClass.responseStructure())
	const {date} = useDate()
	const [rowData, setRowData] = useState({})
	
	useEffect(()=>{
		if(date)
			transacaoClass.get_transacoesFuturas({date: new Date(date).toISOString()})
				.then(res => setDados(res))
				.catch(err => console.error(err))
	},[date, toastObj])

	function editRow(event){
		const eventCell = Array.from(event.currentTarget.cells).map(item=>item.dataset.value)

		const rowInfo = {
			id: eventCell[0],
			dataPrevista: eventCell[1],
			descricao: eventCell[2],
			categoria: eventCell[3],
			valor: fixedValue2Decimals(eventCell[4]),
		}
		console.log(rowInfo)
		setRowData(rowInfo)

		setOpenModalTransacao(true)
	}

	return (  
		<>
			<Card title={'Transações Previstas'}>
				<Table
					hover
					responsive
					striped>
					<thead>
						<tr>
							<th className='d-none'>id</th>
							<th>Data</th>
							<th>Descrição</th>
							<th>Categoria</th>
							<th>Valor</th>
						</tr>
					</thead>
					<tbody>
						{dados.map(el=>{
							const length = el.descricao.length > 43 ? '...' : ''
							return(
								<tr key={el.id} onClick={editRow}>
									<td className='d-none' data-value={el.id}></td>
									<td data-value={el.dataPrevista}>{new Date(el.dataPrevista).toLocaleDateString('pt-BR')}</td>
									<td data-value={el.descricao}>
										{el.descricao.substring(0, 43) + length}
									</td>
									<td data-value={el.id_categoria}>
										{<RoundIcon className={'sm-icon'} bgColor={el?.categoria?.cor} icon={el?.categoria?.icone} />}
										{el?.categoria?.nome}
									</td>
									<td className={el.valor < 0 ? 'text-danger' : 'text-success'} data-value={el.valor}>{currency_formatter(el.valor)}</td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</Card>
			<Modal openModal={openModalTransacao} setOpenModal={setOpenModalTransacao} title={'Editar Transação Futura'}>
				<TransacoesFuturasForm data={rowData} />
			</Modal>
		</>
	)
}

export default TransacoesFuturasCard