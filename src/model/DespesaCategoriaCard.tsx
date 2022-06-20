import DoughnutCard from 'components/UI/DoughnutCard'
import { apiPath } from 'controller/apiPath'
import { fetchData } from 'controller/fetch'
import React, { useEffect, useState } from 'react'
import { useDate } from 'context/dateContext';
import { getToken } from 'context/loginContext';

const DespesaCategoriaCard = () => {
  const {date} = useDate()
  const [dados, setDados] = useState([{
    categoria: "Remédios",
    valor: 500
  }])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}${apiPath.despesasCategoria}?date=${(new Date(date)).toISOString()}`)
    .then(res => res.json())
    .then(res => setDados(res))
    .catch(err => console.error(err))
  }, [date])

  return (
      <DoughnutCard title='Despesas por Categoria' data={dados} label="categoria" dataLabel={["valor"]}/>
  )
}

export default DespesaCategoriaCard