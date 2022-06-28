import Card from '../components/UI/Base/Card/Card'
import { Table as TableBs } from 'reactstrap'
import React, { useEffect, useState } from 'react'
import { apiPath } from '../controller/apiPath';
import RoundIcon from '../components/UI/Base/Icon/RoundIcon';
import axios from 'axios';
import Modal from '../components/UI/Base/Modal/Modal';
import CategoriaForm from './Forms/CategoriaForm';

const CategoriasCard = () => {
  const [openModal, setOpenModal] = useState(false)
  const [dados, setDados] = useState([{
    id_categoria: 1,
    nome: "Viagem",
    cor: "bg-info",
    icone: "plane",
    tipo: ""
  }])

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}${apiPath.categorias}`)
      .then(res => setDados(res.data))
      .catch(err => console.error(err))
  },[])

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
      <Card title={"Categorias"}>
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
      <Modal openModal={openModal} setOpenModal={setOpenModal} title={"Editar Categoria"}>
          <CategoriaForm data={rowData} />
      </Modal>
    </>  
  )
}

export default CategoriasCard