import Card from '../components/UI/Base/Card/Card'
import React, { useEffect, useState } from 'react'
import { useDate } from '../context/dateContext'
import { apiPath } from '../controller/apiPath'
import EditableTable from '../components/UI/Base/Table/EditableTable'
import { currency_formatter } from '../utils/ValueUtils'

const TransacoesCard = () => {
  const [dados, setDados] = useState([{
    id: 1,
    valor: -50,
    descricao: "Flores de dia dos namorados",
    date: "2022-05-27",
    categoria: {
        nome: "Viagem",
        cor: "bg-info",
        icone: "plane"
    },
    conta: {
        apelido: null,
        instituicao: {
            nome: "Dinheiro",
            cor: "bg-success",
            icone: "money-bill"
        }
    }
  }])
  const {date} = useDate()

  const column = [
    {
        Header: "id",
        accessor: "id"
    },
    {
        Header: "date",
        accessor: "date",
        Cell: (({value}) => {return (new Date(value).toLocaleDateString('pt-BR'))})
    },
    {
        Header: "descricao",
        accessor: "descricao"
    },
    {
        Header: "categoria",
        accessor: "categoria_nome"
    },
    {
        Header: "conta",
        accessor: "conta_nome"
    },
    {
        Header: "valor",
        accessor: "valor",
        Cell: (({value}) => {return currency_formatter(value)})
    }
  ]

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}${apiPath.categoriasCompletas}`)
    .then(res => res.json())
    .then(res => setDados(
      res.map(el => {
        const elRes = {...(({categoria, conta, ...o}) => o)(el), 
        categoria_nome: el.categoria.nome,
        conta_nome: el.conta.instituicao.nome
      }
        return elRes
    })))
    .catch(err => console.error(err))
  },[date])

  return (  
    <Card title={"Transações"}>
        <EditableTable data={dados} column={column}/>
    </Card>
  )
}

export default TransacoesCard