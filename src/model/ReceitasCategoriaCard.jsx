import DoughnutCard from '../components/UI/DoughnutCard'
import { apiPath } from '../controller/apiPath'
import React, { useEffect, useState } from 'react'
import { useDate } from '../context/dateContext'
import axios from 'axios'

const ReceitasCategoriaCard = () => {
  const {date} = useDate()
  const [dados, setDados] = useState([{
    categoria: "Remédios",
    valor: 500
  }])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}${apiPath.receitasCategoria}?date=${(new Date(date)).toISOString()}`)
    .then(res => setDados(res.data))
    .catch(err => console.error(err))
  }, [date])

  return (
    <DoughnutCard title='Receitas por Categoria' data={dados} label="categoria" dataLabel={["valor"]}/>
  )
}

export default ReceitasCategoriaCard