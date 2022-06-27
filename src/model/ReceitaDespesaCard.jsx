import VerticalBar from '../components/Charts/Bar/VerticalBar/VerticalBar'
import Card from '../components/UI/Base/Card/Card'
import { apiPath } from '../controller/apiPath'
import React, { useEffect, useState } from 'react'
import { useDate } from '../context/dateContext'
import axios from 'axios'

const ReceitaDespesaCard = () => {
  const {date} = useDate()
  const [dados, setDados] = useState([{
    date: "Janeiro",
    despesa: 800,
    receita: 1000
  }])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}${apiPath.gastosReceitasMensal}?date=${(new Date(date)).toISOString()}`)
    .then(res => setDados(res.data))
    .catch(err => console.error(err))
  }, [date])

  return (
    <Card title="Gastos e Receitas" smallTitle="Relatório">
        <VerticalBar data={dados} label="date" dataLabel={["receita", "despesa"]}/>
    </Card>
  )
}

export default ReceitaDespesaCard