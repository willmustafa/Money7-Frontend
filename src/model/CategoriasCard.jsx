import Card from '../components/UI/Base/Card/Card'
import { Table as TableBs } from 'reactstrap'
import React, { useEffect, useState } from 'react'
import RoundIcon from '../components/UI/Base/Icon/RoundIcon'
import Modal from '../components/UI/Base/Modal/Modal'
import CategoriaForm from './Forms/CategoriaForm'
import Categoria from '../controller/Categoria'
import useAuth from '../hooks/useAuth'
import { useToast } from '../context/toastContext'

const CategoriasCard = () => {
	const {auth} = useAuth()
	const {toastObj} = useToast()
	const categoriaClass = new Categoria(process.env.REACT_APP_API_URL, auth)
	const [openModal, setOpenModal] = useState(false)

	const [dados, setDados] = useState(categoriaClass.responseStructure())

	useEffect(()=>{
		categoriaClass.get()
			.then(res => setDados(res))
			.catch(err => console.error(err))
	},[toastObj])

	const [rowData, setRowData] = useState({})
	function editRow(event){
		const eventCell = Array.from(event.currentTarget.cells).map(item=>item.dataset.value)
		const rowInfo = {
			id_categoria: eventCell[0],
			nome: eventCell[1],
			tipo: eventCell[2],
			iconeArray: eventCell[3].split(',')
		}
		setRowData(rowInfo)
		setOpenModal(true)
	}

	return (
		<>
			<Card title={'Categorias'}>
				<TableBs>
					<thead>
						<tr>
							<th className='d-none'>id</th>
							<th>Nome</th>
							<th>Categoria</th>
							<th>Ícone</th>
						</tr>
					</thead>
					<tbody>
						{dados.map(el=>{
							return(
								<tr key={el.id_categoria} onClick={editRow}>
									<td className='d-none' data-value={el.id_categoria}>{el.id_categoria}</td>
									<td data-value={el.nome}>{el.nome}</td>
									<td data-value={el.tipo}>{el.tipo}</td>
									<td data-value={[el.cor, el.icone]}>{<RoundIcon bgColor={el.cor} icon={el.icone} />}</td>
								</tr>
							)
						})}
					</tbody>
				</TableBs>
			</Card>
			<Modal openModal={openModal} setOpenModal={setOpenModal} title={'Editar Categoria'}>
				<CategoriaForm data={rowData} />
			</Modal>
		</>  
	)
}

export default CategoriasCard