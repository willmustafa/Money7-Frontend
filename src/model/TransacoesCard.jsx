import Card from '../components/UI/Base/Card/Card'
import React, { useEffect, useState } from 'react'
import { useDate } from '../context/dateContext'
import { currency_formatter } from '../utils/ValueUtils'
import { Table } from 'reactstrap'
import RoundIcon from '../components/UI/Base/Icon/RoundIcon'
import Modal from '../components/UI/Base/Modal/Modal'
import TransacaoForm from './Forms/TransacaoForm'
import Transacao from '../controller/Transacao'

const TransacoesCard = () => {
  const transacaoClass = new Transacao(process.env.REACT_APP_API_URL)

  const [openModal, setOpenModal] = useState(false)
  const [dados, setDados] = useState(transacaoClass.responseStructure())
  const {date} = useDate()
  const [rowData, setRowData] = useState({})

  useEffect(()=>{
    transacaoClass.get()
    .then(res => setDados(res))
    .catch(err => console.error(err))
  },[date])

  function editRow(event){
    const eventCell = Array.from(event.currentTarget.cells).map(item=>item.dataset.value)
    const rowInfo = {
      id: eventCell[0],
      date: eventCell[1],
      descricao: eventCell[2],
      categoria: eventCell[3],
      conta: eventCell[4],
      valor: eventCell[5]
    }
    setRowData(rowInfo)
    setOpenModal(true)
  }

  return (  
    <>
      <Card title={"Transações"}>
          <Table>
            <thead>
              <tr>
                <th className='d-none'>id</th>
                <th>Data</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Conta</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {dados.map(el=>{
                return(
                  <tr key={el.id} onClick={editRow}>
                    <td className='d-none' data-value={el.id}></td>
                    <td data-value={el.date}>{new Date(el.date).toLocaleDateString('pt-br')}</td>
                    <td data-value={el.descricao}>{el.descricao}</td>
                    <td data-value={el.categoria.id_categoria}>{<RoundIcon className={'sm-icon'} bgColor={el.categoria.cor} icon={el.categoria.icone} />}{el.categoria.nome}</td>
                    <td data-value={el.conta.id_conta}>{<RoundIcon className={'sm-icon'} bgColor={el.conta.instituicao.cor} icon={el.conta.instituicao.icone} />}{el.conta.id_cartao ? 'Cartão ' : ''}{el.conta.instituicao.nome}</td>
                    <td data-value={el.valor}>{currency_formatter(el.valor)}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
      </Card>
      <Modal openModal={openModal} setOpenModal={setOpenModal} title={"Editar Cartão"}>
        <TransacaoForm data={rowData} />
      </Modal>
    </>
  )
}

export default TransacoesCard