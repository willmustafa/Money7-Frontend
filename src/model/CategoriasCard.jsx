import Card from '../components/UI/Base/Card/Card'
import Table from '../components/UI/Base/Table/Table'
import React, { useEffect, useState } from 'react'
import { useDate } from '../context/dateContext';
import { apiPath } from '../controller/apiPath';

const CategoriasCard = () => {
  const [dados, setDados] = useState([{
    id_categoria: 1,
    nome: "Viagem",
    cor: "bg-info",
    icone: "plane"
  }])
  const {date} = useDate()

  const column = [
    {
        Header: "id",
        accessor: "id_categoria"
    },
    {
        Header: "Nome",
        accessor: "nome"
    },
    {
        Header: "Cor",
        accessor: "cor"
    },
    {
        Header: "Ícone",
        accessor: "icone"
    }
  ]

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}${apiPath.categoriasCompletas}`)
      .then(res => res.json())
      .then(res => setDados(res))
      .catch(err => console.error(err))
  },[date])

  return (  
    <Card title={"Categorias"}>
        <Table data={dados} columns={column}/>
    </Card>
  )
}

export default CategoriasCard