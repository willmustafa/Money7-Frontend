import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { fetchData } from 'controller/fetch'
import { apiPath } from 'controller/apiPath'
import { getToken } from 'context/loginContext'

const ObjetivoForm = props => {
    const [objetivo, setObjetivo] = useState(props.titulo)
    const [valor, setValor] = useState(props.valor_total)
    const [categorias, setCategorias] = useState([{
        id_categoria: 1,
        nome: "",
        cor: "",
        icone: "plus",
        tipo: ""
    }])

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}${apiPath.categoriasCompletas}`)
        .then(res => res.json())
        .then(res => setCategorias(res))
        .catch(err => console.error(err))
    },[])

    return (
        <Form>
            <div>
                <Row className="row">
                    <Col lg="12">
                        <FormGroup>
                            <Label>Nome do Objetivo</Label>
                            <Input name="nomeObjetivo" placeholder="Viagem para Tóquio" type="text" value={objetivo} onChange={(e)=>setObjetivo(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col lg="12">
                        <FormGroup>
                            <Label>Categoria</Label>
                            <Input type="select" value={props.id_objetivo}>
                                {categorias.map(el => 
                                    <option 
                                    value={el.id_categoria} 
                                    key={el.id_categoria} 
                                    >
                                        {el.nome}
                                    </option>
                                )}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg="12">
                        <FormGroup>
                            <Label>Data para atingir o objetivo</Label>
                            <Input placeholder="dd/mm/aaaa" type="date" />
                        </FormGroup>
                    </Col>
                    <Col lg="12">
                        <FormGroup>
                            <Label>Valor</Label>
                            <Input placeholder="0,00" type="number" value={valor} onChange={(e)=>setValor(e.target.value)}  />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
        </Form>
    )
}

ObjetivoForm.propTypes = {
    titulo: PropTypes.string,
    valor_total: PropTypes.number,
}

ObjetivoForm.defaultProps = {
    titulo: "",
    valor_total: "",
}

export default ObjetivoForm