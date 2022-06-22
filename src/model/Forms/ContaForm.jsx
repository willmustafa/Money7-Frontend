import { apiPath } from '../../controller/apiPath'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, ModalFooter, Row } from 'reactstrap'

const ContaForm = props => {
    const [id_instituicao, setId_instituicao] = useState(props.id_instituicao)
    const [saldo, setSaldo] = useState(props.saldo ? props.saldo : 0)
    const [date, setDate] = useState(props.date ? props.date : "")
    const [instituicao, setInstituicao] = useState([{
        id_instituicao: 1,
        nome: "Dinheiro",
        cor: "bg-success",
        icone: "money-bill",
    }])

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}${apiPath.instituicoes}`)
        .then(res => res.json())
        .then(res => setInstituicao(res))
        .catch(err => console.error(err))
    },[])

    function deleteConta(){
        fetch(`${process.env.REACT_APP_API_URL}${apiPath.contas}byId/${props.id_conta}`, {
            method: 'delete'
        })
        .then(() => props.closeModal())
    }

    function newConta(event){
        event.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}${apiPath.contas}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                saldo,
                date,
                id_instituicao: id_instituicao,
                id_users: 1,
            })
        })
        .then(() => props.closeModal())
    }

    return (
        <Form 
        onSubmit={event => newConta(event)}  
        method="POST"
        >
            <div>
                <Row className="row">
                    <Col lg="12">
                        <FormGroup>
                            <Label>Nome do Banco</Label>
                            <Input type='select' value={props.id_instituicao} name="id_instituicao" onChange={(e)=>setId_instituicao(e.target.value)}>
                                {instituicao.map(el => 
                                    <option 
                                    value={el.id_instituicao} 
                                    key={el.id_instituicao} 
                                    >
                                        {el.nome}
                                    </option>
                                )}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg="12">
                        <FormGroup>
                            <Label>Data do inicio da conta</Label>
                            <Input 
                            name="date"
                            placeholder="dd/mm/aaaa" 
                            type="date" 
                            value={date} 
                            onChange={(e)=>setDate(e.target.value)}  
                            />
                        </FormGroup>
                    </Col>
                    <Col lg="12">
                        <FormGroup>
                            <Label>Saldo inicial</Label>
                            <Input 
                            name="saldo"
                            placeholder="0,00" 
                            type="number" 
                            value={saldo} 
                            onChange={(e)=>setSaldo(e.target.value)} 
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <ModalFooter>
                <Button
                    color="danger"
                    onClick={deleteConta}
                >
                    Excluir
                </Button>
                <Button
                    color="primary"
                    type='submit'
                >
                    Salvar
                </Button>
                <Button onClick={props.closeModal}>
                    Cancelar
                </Button>
            </ModalFooter>
        </Form>
    )
}

export default ContaForm