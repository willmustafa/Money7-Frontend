import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, FormGroup, Input, Label, ModalFooter, Row } from 'reactstrap'
import Instituicao from '../../controller/Instituicao'
import Cartao from '../../controller/Cartao'

const CartaoForm = props => {
    const instituicaoClass = new Instituicao(process.env.REACT_APP_API_URL)
    const cartaoClass = new Cartao(process.env.REACT_APP_API_URL)

    const id_cartao = props.id_cartao ? props.id_cartao : 0
    const [id_instituicao, setIdConta] = useState(props.id_instituicao ? props.id_instituicao : 0)
    const [fechamento, setFechamento] = useState(props.fechamento ? props.fechamento : 15)
    const [vencimento, setVencimento] = useState(props.vencimento ? props.vencimento : 8)
    const [limite, setLimite] = useState(props.limite ? props.limite : 1000)
    const [cartao, setCartao] = useState(cartaoClass.responseStructure())
    const [instituicao, setInstituicao] = useState(instituicaoClass.responseStructure())

    useEffect(()=>{
        cartaoClass.get()
        .then(res => setCartao(res))
        .catch(err => console.error(err))
    },[])

    useEffect(()=>{
        instituicaoClass.get()
        .then(res => setInstituicao(res))
        .catch(err => console.error(err))
    },[])

    async function save(event, exclude){
        event.preventDefault()
        const data = {
            id_instituicao,
            limite,
            fechamento,
            vencimento,
            id_users: 1 // Alterar
        }

        await cartaoClass.save(id_cartao, data, exclude)
        .then(data => console.log(data))
        .catch(error => console.log(error))
        .finally(()=> props.closeModal())
    }
    
    return (
        <Form>
            <div>
                <Row className="row">
                    <Col lg="12">
                        <FormGroup>
                            <Label>Banco</Label>
                            <Input type="select" value={id_instituicao} onChange={(e)=>setIdConta(e.target.value)}>
                                {instituicao.map(el => 
                                    <option value={el.id_instituicao} key={el.id_instituicao}>{el.nome}</option>
                                )}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg="12">
                        <FormGroup>
                            <Label>Data de fechamento</Label>
                            <Input placeholder="1" type="number" value={fechamento} onChange={(e)=>setFechamento(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col lg="12">
                        <FormGroup>
                            <Label>Data de vencimento</Label>
                            <Input placeholder="1" type="number" value={vencimento} onChange={(e)=>setVencimento(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col lg="12">
                        <FormGroup>
                            <Label>Limite</Label>
                            <Input placeholder="0,00" type="number" value={limite} onChange={(e)=>setLimite(e.target.value)}  />
                        </FormGroup>
                    </Col>
                </Row>
                <ModalFooter>
                {id_cartao !== 0 ? (                
                <Button
                    className='me-auto'
                    color="danger"
                    onClick={event => save(event, true)}
                    >
                        Excluir
                </Button>) : ""}
               
                <Button onClick={props.closeModal}>
                    Cancelar
                </Button>

                <Button
                    color="primary"
                    type='submit'
                    onClick={event => save(event)}
                >
                    Salvar
                </Button>
            </ModalFooter>
            </div>
        </Form>
    )
}

CartaoForm.propTypes = {
    id_cartao: PropTypes.number,
    id_instituicao: PropTypes.number,
    fechamento: PropTypes.number,
    vencimento: PropTypes.number,
    limite: PropTypes.number
}

CartaoForm.defaultProps = {
    cartao: "",
    apelido: "",
    limite: 0,
}

export default CartaoForm