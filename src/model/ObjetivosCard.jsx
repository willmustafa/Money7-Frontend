import React, { useEffect, useState } from 'react'
import ProgressIconTitle from '../components/UI/ProgressIconTitle'
import Card from '../components/UI/Base/Card/Card'
import { apiPath } from '../controller/apiPath'
import { useDate } from '../context/dateContext'

const ObjetivosCard = props => {
    const {date} = useDate()
    const [dados, setDados] = useState([{
        id_objetivo: 1,
        titulo: "",
        cor: "",
        icone: "",
        valor_total: 0,
        date: "",
        categoria: {
            nome: "",
            cor: "",
            icone: ""
        }
  }])
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}${apiPath.objetivos}?date=${(new Date(date)).toISOString()}`)
        .then(res => res.json())
        .then(res => setDados(res))
        .catch(err => console.error(err))
    }, [date])
    
    return (
        <Card title={"Objetivos"}>
            {dados.map((item) => {
            return <ProgressIconTitle
                    title={item.titulo}
                    smallTitle={item.categoria.nome}
                    icon={item.icone}
                    bgColor={item.cor}
                    value={0}
                    max={item.valor_total}
                    key={item.id_objetivo}
                    />
            })}
        </Card>
    )
}

export default ObjetivosCard