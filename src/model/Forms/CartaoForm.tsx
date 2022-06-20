import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { fetchData } from 'controller/fetch'
import { apiPath } from 'controller/apiPath'
import { getToken } from 'context/loginContext'

const CartaoForm = props => {
    const [cartao, setCartao] = useState(props.cartao)
    const [apelido, setApelido] = useState(props.apelido)
    const [limite, setLimite] = useState(props.limite)

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
        fetch(`${process.env.REACT_APP_API_URL}${apiPath.contas}`)
        .then(res => res.json())
        .then(res => setContas(res))
        .catch(err => console.error(err))
    },[])
    
    return (
        <Form>
            <div>
                <Row className="row">
                    <Col lg="12">
                        <FormGroup>
                            <Label>Cartão</Label>
                            <Input placeholder="NuBank" type="text" value={cartao} onChange={(e)=>setCartao(e.target.value)}  />
                        </FormGroup>
                    </Col>
                    <Col lg="12">
                        <FormGroup>
                            <Label>Apelido</Label>
                            <Input placeholder="Nu" type="text" value={apelido} onChange={(e)=>setApelido(e.target.value)}  />
                        </FormGroup>
                    </Col>
                    <Col lg="12">
                        <FormGroup>
                            <Label>Banco</Label>
                            <Input type="select" value={props.id_conta}>
                                {contas.map(el => 
                                    <option value={el.id_conta} key={el.id_conta}>{el.instituicao.nome}</option>
                                )}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg="12">
                        <FormGroup>
                            <Label>Data de vencimento</Label>
                            <Input placeholder="1" type="number" value={props.vencimento} />
                        </FormGroup>
                    </Col>
                    <Col lg="12">
                        <FormGroup>
                            <Label>Limite</Label>
                            <Input placeholder="0,00" type="number" value={limite} onChange={(e)=>setLimite(e.target.value)}  />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
        </Form>
    )
}

CartaoForm.propTypes = {
    cartao: PropTypes.string,
    apelido: PropTypes.string,
    limite: PropTypes.number,
}

CartaoForm.defaultProps = {
    cartao: "",
    apelido: "",
    limite: 0,
}

export default CartaoForm