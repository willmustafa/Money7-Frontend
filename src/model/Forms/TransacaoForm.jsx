import { apiPath } from '../../controller/apiPath'
import React, { useEffect, useState } from 'react'
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import axios from 'axios'

const TransacaoForm = () => {
    const [categorias, setCategorias] = useState([{
        id_categoria: 1,
        nome: "",
        cor: "",
        icone: "",
        tipo: ""
    }])
    const [contas, setContas] = useState([{
        id_conta: 1,
        saldo: 0,
        apelido: null,
        date: "",
        instituicao: {
            nome: "Dinheiro",
            cor: "bg-success",
            icone: "money-bill"
        }
    }])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}${apiPath.categoriasCompletas}`)
        .then(res => setCategorias(res.data))
        .catch(err => console.error(err))
    },[])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}${apiPath.contas}`)
        .then(res => setContas(res.data))
        .catch(err => console.error(err))
    },[])

    return (
        <Form>
            <div>
                <Row className="row">
                    <Col lg="12">
                        <FormGroup>
                            <Label>Valor</Label>
                            <Input placeholder="0,00" type="number" />
                        </FormGroup>
                    </Col>
                    <Col lg="12">
                        <FormGroup>
                            <Label>Data</Label>
                            <Input placeholder="dd/mm/aaaa" type="date" />
                        </FormGroup>
                    </Col>
                    <Col lg="12">
                        <FormGroup>
                            <Label>Descrição</Label>
                            <Input placeholder="Alpiste para passarinho" type="text" />
                        </FormGroup>
                    </Col>
                    <Col lg="12">
                        <FormGroup>
                            <Label>Categoria</Label>
                            <Input type="select">
                                {categorias.map(el => 
                                    <option value={el.id_categoria} key={el.id_categoria}>{el.nome}</option>
                                )}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg="12">
                        <FormGroup>
                            <Label>Conta</Label>
                            <Input type="select">
                                {contas.map(el => 
                                    <option value={el.id_conta} key={el.id_conta}>{el.instituicao.nome}</option>
                                )}
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
            </div>
        </Form>
    )
}

export default TransacaoForm