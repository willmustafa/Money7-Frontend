import React, { useEffect, useState } from 'react'
import ProgressIconTitle from '../components/UI/ProgressIconTitle'
import Card from '../components/UI/Base/Card/Card'
import { apiPath } from '../controller/apiPath'
import { useDate } from '../context/dateContext'

const ObjetivosCard = props => {
    const {date} = useDate()
    const [dados, setDados] = useState([{
        id_objetivo: 1,
        titulo: "Viagem Japão",
        cor: "bg-success",
        valor_total: 10000,
        date: "2022-05-27",
        saldo_atual: 10000,
        categoria: {
            nome: "Viagem",
            cor: "bg-info",
            icone: "plane"
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
                    icon={item.categoria.icone}
                    bgColor={item.cor}
                    value={item.saldo_atual}
                    max={item.valor_total}
                    key={item.id_objetivo}
                    />
            })}
        </Card>
    )
}

export default ObjetivosCard