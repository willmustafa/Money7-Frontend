import Card from '../components/UI/Base/Card/Card'
import { Table as TableBs } from 'reactstrap'
import React, { useEffect, useState } from 'react'
import Modal from '../components/UI/Base/Modal/Modal'
import TagForm from './Forms/TagForm'
import Tag from '../controller/Tag'
import useAuth from '../hooks/useAuth'
import { useToast } from '../context/toastContext'

const TagsCard = () => {
	const {auth} = useAuth()
	const {toastObj} = useToast()
	const tagClass = new Tag(process.env.REACT_APP_API_URL, auth)
	const [openModal, setOpenModal] = useState(false)

	const [dados, setDados] = useState(tagClass.responseStructure())

	useEffect(()=>{
		tagClass.get()
			.then(res => setDados(res))
			.catch(err => console.error(err))
	},[toastObj])

	const [rowData, setRowData] = useState({})
	function editRow(event){
		const eventCell = Array.from(event.currentTarget.cells).map(item=>item.dataset.value)
		const rowInfo = {
			id: eventCell[0],
			nome: eventCell[1],
		}
		setRowData(rowInfo)
		setOpenModal(true)
	}

	return (
		<>
			<Card title={'Tags'}>
				<TableBs>
					<thead>
						<tr>
							<th className='d-none'>id</th>
							<th>Nome</th>
						</tr>
					</thead>
					<tbody>
						{dados.map(el=>{
							return(
								<tr key={el.id} onClick={editRow}>
									<td className='d-none' data-value={el.id}>{el.id}</td>
									<td data-value={el.nome}>{el.nome}</td>
								</tr>
							)
						})}
					</tbody>
				</TableBs>
			</Card>
			<Modal openModal={openModal} setOpenModal={setOpenModal} title={'Editar Tag'}>
				<TagForm data={rowData} />
			</Modal>
		</>  
	)
}

export default TagsCard