import Card from '../components/UI/Base/Card/Card'
import { Table as TableBs } from 'reactstrap'
import React, { useEffect, useState } from 'react'
import { apiPath } from '../controller/apiPath';
import RoundIcon from '../components/UI/Base/Icon/RoundIcon';
import axios from 'axios';

const CategoriasCard = () => {
  const [dados, setDados] = useState([{
    id_categoria: 1,
    nome: "Viagem",
    cor: "bg-info",
    icone: "plane",
    tipo: ""
  }])

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}${apiPath.categoriasCompletas}`)
      .then(res => setDados(res.data))
      .catch(err => console.error(err))
  },[])

  return (  
    <Card title={"Categorias"}>
      <TableBs>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Ícone</th>
          </tr>
        </thead>
        <tbody>
          {dados.map(el=>{
            return(
              <tr key={el.id_categoria}>
                <td>{el.nome}</td>
                <td>{el.tipo}</td>
                <td>{<RoundIcon bgColor={el.cor} icon={el.icone} />}</td>
              </tr>
            )
          })}
        </tbody>
      </TableBs>
    </Card>
  )
}

export default CategoriasCard