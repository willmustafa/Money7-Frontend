import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, FormGroup, Input, Label, ModalFooter, Row } from 'reactstrap'
import { apiPath } from '../../controller/apiPath'
import axios from 'axios'
import ColorPicker from '../../components/UI/Base/Forms/ColorPicker'

const ObjetivoForm = props => {
    const [check, setCheck] = useState(props.cor ? props.cor : 'bg-primary')

    const [id_objetivo] = useState(props.id_objetivo ? props.id_objetivo : 0)
    const [date, setDate] = useState(props.date)
    const [objetivo, setObjetivo] = useState(props.titulo)
    const [valor, setValor] = useState(props.valor_total)
    const [id_categoria, setIdCategoria] = useState(props.id_categoria ? props.id_categoria : 1)
    const [description, setDescription] = useState(props.description ? props.description : '')
    const [categorias, setCategorias] = useState([{
        id_categoria: 1,
        nome: "",
        cor: "",
        tipo: ""
    }])

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}${apiPath.categorias}`)
        .then(res => res.json())
        .then(res => setCategorias(res))
        .catch(err => console.error(err))
    },[])

    async function save(event, exclude){
        event.preventDefault()
        const requestParams = {
            method: id_objetivo !== 0 ? (exclude ? 'DELETE' : 'PUT'): 'POST',
            url:`${process.env.REACT_APP_API_URL}${apiPath.objetivos}/${id_objetivo !== 0 ? id_objetivo : ''}`,
            data: {
                description,
                titulo: objetivo,
                valor,
                date,
                id_categoria,
                cor: check,
                id_users: 1 // Alterar
            }
        }
        await axios(requestParams).then(data => console.log(data))
        .catch(error => console.log(error))
        .finally(()=> props.closeModal())
    }

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
                            <Input type="select" value={id_categoria} onChange={(e)=>setIdCategoria(e.target.value)}>
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
                    <ColorPicker colorPicked={check} setCheck={setCheck} />
                    <Col lg="12">
                        <FormGroup>
                            <Label>Data para atingir o objetivo</Label>
                            <Input placeholder="dd/mm/aaaa" type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col lg="12">
                        <FormGroup>
                            <Label>Valor</Label>
                            <Input placeholder="0,00" type="number" value={valor} onChange={(e)=>setValor(e.target.value)}  />
                        </FormGroup>
                    </Col>
                    <Col lg="12">
                        <FormGroup>
                            <Label>Anotações</Label>
                            <Input type='textarea' name='description' value={description} onChange={e=>setDescription(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <ModalFooter>
                {id_objetivo !== 0 ? (                
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
        </Form>
    )
}

ObjetivoForm.defaultProps = {
    titulo: "",
    valor_total: "",
}

export default ObjetivoForm