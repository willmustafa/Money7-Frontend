import DoughnutCard from '../components/UI/DoughnutCard'
import { apiPath } from '../controller/apiPath'
import React, { useEffect, useState } from 'react'
import { useDate } from '../context/dateContext';
import axios from 'axios';

const DespesaCategoriaCard = () => {
  const {date} = useDate()
  const [dados, setDados] = useState([{
    categoria: "Remédios",
    valor: 500
  }])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}${apiPath.despesasCategoria}?date=${(new Date(date)).toISOString()}`)
    .then(res => setDados(res.data))
    .catch(err => console.error(err))
  }, [date])

  return (
      <DoughnutCard title='Despesas por Categoria' data={dados} label="categoria" dataLabel={["valor"]}/>
  )
}

export default DespesaCategoriaCard