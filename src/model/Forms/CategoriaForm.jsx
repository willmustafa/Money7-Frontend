import { apiPath } from '../../controller/apiPath'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, ModalFooter, Row } from 'reactstrap'
import axios from 'axios'
import ColorPicker from '../../components/UI/Base/Forms/ColorPicker'

const CategoriaForm = (props) => {
    const propsData = props.data ? props.data : {
        id_categoria: 0,
        nome: '',
        tipo: '',
        iconeArray: ['','']
    }

    const [nome, setNome] = useState(propsData.nome ? propsData.nome : '')
    const [tipo, setTipo] = useState(propsData.tipo ? propsData.tipo : '')
    const [icone, setIcone] = useState(propsData.iconeArray[1] ? propsData.iconeArray[1] :'')
    const [color, setColor] = useState(propsData.iconeArray[0] ? propsData.iconeArray[0] : 'bg-primary')

    async function save(event, exclude){
        event.preventDefault()
        const requestParams = {
            method: propsData.id_categoria !== 0 ? (exclude ? 'DELETE' : 'PUT'): 'POST',
            url:`${process.env.REACT_APP_API_URL}${apiPath.categorias}/${propsData.id_categoria !== 0 ? propsData.id_categoria : ''}`,
            data: {
                nome,
                tipo,
                icone,
                cor: color,
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
                            <Label>Nome</Label>
                            <Input placeholder="Farmácia" type="text" value={nome} onChange={e=>setNome(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col lg="12">
                        <FormGroup>
                            <Label>Tipo</Label>
                            <Input placeholder="Gastos Essenciais" type="text" value={tipo} onChange={e=>setTipo(e.target.value)}/>
                        </FormGroup>
                    </Col>
                    <Col lg="12">
                        <FormGroup>
                            <Label>Ícone</Label>
                            <Input placeholder="plane" type="text" value={icone} onChange={e=>setIcone(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <ColorPicker colorPicked={color} setCheck={setColor} />
                </Row>
            </div>
            <ModalFooter>
                {props.data && props.data.id_categoria !== 0 ? (                
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

export default CategoriaForm