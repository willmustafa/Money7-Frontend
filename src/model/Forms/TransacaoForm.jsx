import { apiPath } from '../../controller/apiPath'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, Input, InputGroup, Label, ModalFooter, Row } from 'reactstrap'
import axios from 'axios'
import Modal from '../../components/UI/Base/Modal/Modal'
import ContaForm from './ContaForm'
import CategoriaForm from './CategoriaForm'
import { IMaskInput } from 'react-imask';

const TransacaoForm = (props) => {
    const [openModalCategoria, setOpenModalCategoria] = useState(false)
    const [openModalConta, setOpenModalConta] = useState(false)

    const propsData = props.data ? props.data : {
        id: 0,
        valor: '',
        date: '',
        descricao: '',
        categoria: '',
        conta: ''
    }

    const [modalTypeTitle] = useState(props.modalTypeTitle ? props.modalTypeTitle : 'despesa')
    const [valor, setValor] = useState(propsData.valor ? propsData.valor : 0)
    const [date, setDate] = useState(propsData.date ? propsData.date : new Date())
    const [descricao, setDescricao] = useState(propsData.descricao ? propsData.descricao: '')
    const [categoria, setCategoria] = useState(propsData.categoria ? propsData.categoria : 0)
    const [conta, setConta] = useState(propsData.conta ? propsData.conta : 0)

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
        axios.get(`${process.env.REACT_APP_API_URL}${apiPath.categorias}`)
        .then(res => setCategorias(res.data))
        .catch(err => console.error(err))
    },[openModalCategoria])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}${apiPath.contas}`)
        .then(res => setContas(res.data))
        .catch(err => console.error(err))
    },[openModalConta])

    async function save(event, exclude){
        event.preventDefault()
        const requestParams = {
            method: propsData.id !== 0 ? (exclude ? 'DELETE' : 'PUT'): 'POST',
            url:`${process.env.REACT_APP_API_URL}${apiPath.transacoes}/${propsData.id !== 0 ? propsData.id : ''}`,
            data: {
                date,
                id_categoria: categoria,
                id_conta: conta,
                descricao,
                status: true,
                valor,
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
                            <Label>Valor</Label>
                            <Input placeholder="0,00" type="number" value={valor} onChange={e=>setValor(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col lg="12">
                        <FormGroup>
                            <Label>Data</Label>
                            <Input placeholder="dd/mm/aaaa" type="date" value={date} onChange={e=>setDate(e.target.value)}/>
                        </FormGroup>
                    </Col>
                    {modalTypeTitle != 'transferencia' ? (
                    <Col lg="12">
                        <FormGroup>
                            <Label>Descrição</Label>
                            <Input placeholder="Alpiste para passarinho" type="text" value={descricao} onChange={e=>setDescricao(e.target.value)} />
                        </FormGroup>
                    </Col>
                    ) : ''}
                    {modalTypeTitle != 'transferencia' ? (
                    <Col lg="12">
                        <FormGroup>
                            <Label>Categoria</Label>
                            <InputGroup>
                                <Input className='col-8' type="select" name='categoria' value={categoria} onChange={e=>setCategoria(e.target.value)}>
                                    {categorias.map(el => 
                                        <option value={el.id_categoria} key={el.id_categoria}>{el.nome}</option>
                                    )}
                                </Input>
                                <Button className='col-4' onClick={() => setOpenModalCategoria(true)}>Nova</Button>
                            </InputGroup>
                            <Modal openModal={openModalCategoria} setOpenModal={setOpenModalCategoria} title={"Editar Categoria"}>
                                <CategoriaForm />
                            </Modal>
                        </FormGroup>
                    </Col>
                    ): ''}
                    <Col lg="12">
                        <FormGroup>
                            <Label>{modalTypeTitle == 'transferencia' ? 'Saiu da ' : ''}Conta</Label>
                            <InputGroup>
                                <Input type="select" name='conta' value={conta} onChange={e=>setConta(e.target.value)}>
                                    {contas.map(el => 
                                        <option value={el.id_conta} key={el.id_conta}>{el.instituicao.nome}</option>
                                    )}
                                </Input>
                                <Button className='col-4' onClick={() =>setOpenModalConta(true)}>Nova</Button>
                            </InputGroup>
                            <Modal openModal={openModalConta} setOpenModal={setOpenModalConta} title={"Editar Categoria"}>
                                <ContaForm />
                            </Modal>
                        </FormGroup>
                    </Col>
                    {modalTypeTitle == 'transferencia' ? (
                    <Col lg="12">
                        <FormGroup>
                            <Label>Entrou na Conta</Label>
                            <InputGroup>
                                <Input type="select" name='conta' value={conta} onChange={e=>setConta(e.target.value)}>
                                    {contas.map(el => 
                                        <option value={el.id_conta} key={el.id_conta}>{el.instituicao.nome}</option>
                                    )}
                                </Input>
                                <Button className='col-4' onClick={() =>setOpenModalConta(true)}>Nova</Button>
                            </InputGroup>
                            <Modal openModal={openModalConta} setOpenModal={setOpenModalConta} title={"Editar Categoria"}>
                                <ContaForm />
                            </Modal>
                        </FormGroup>
                    </Col>
                    ): ''}
                </Row>
            </div>
            <ModalFooter>
                {conta !== 0 ? (                
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

export default TransacaoForm