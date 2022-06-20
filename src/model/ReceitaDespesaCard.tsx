import VerticalBar from 'components/Charts/Bar/VerticalBar/VerticalBar'
import Card from 'components/UI/Base/Card/Card'
import { apiPath } from 'controller/apiPath'
import { fetchData } from 'controller/fetch'
import React, { useEffect, useState } from 'react'
import { useDate } from 'context/dateContext';
import { getToken } from 'context/loginContext'

const ReceitaDespesaCard = () => {
  const {date} = useDate()
  const [dados, setDados] = useState([{
    date: "Janeiro",
    despesa: 800,
    receita: 1000
  }])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}${apiPath.gastosReceitasMensal}?date=${(new Date(date)).toISOString()}`)
    .then(res => res.json())
    .then(res => setDados(res))
    .catch(err => console.error(err))
  }, [date])

  return (
    <Card title="Gastos e Receitas" smallTitle="Relatório">
        <VerticalBar data={dados} label="date" dataLabel={["receita", "despesa"]}/>
    </Card>
  )
}

export default ReceitaDespesaCard