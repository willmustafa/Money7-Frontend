import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import Card from '../components/UI/Base/Card/Card'
import { getEmail, getName } from '../context/loginContext'

const UserView = () => {
    const [name, setName] = useState(getName())
    const [email, setEmail] = useState(getEmail())

    return (
        <>
            <div className="main-header" />
            <section className='mt-n-7 container'>
                <Row className="mb-5">
                    <Col xl="12">
                        <Card title={"Minha conta"}>
                        <Form>
                            <div>
                                <Row className="row">
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label>Nome Completo</Label>
                                            <Input name='name' placeholder="Willian Felipe" type="text" value={name} onChange={(e)=>setName(e.target.value)} autoComplete="false"/>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label>E-mail</Label>
                                            <Input name='email' placeholder="willianfmustafa@gmail.com" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete="false"/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <div className='my-4'>
                                    <Button color='success'>Salvar</Button>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <h6 className="heading-small text-muted mb-4">Senhas</h6>
                            <div>
                                <Row className="row">
                                    <Col lg="4">
                                        <FormGroup>
                                            <Label>Senha Atual</Label>
                                            <Input name="pass_old" placeholder="*******" type="password" autoComplete="false"/>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup>
                                            <Label>Nova Senha</Label>
                                            <Input name="pass_new" placeholder="*******" type="password" autoComplete="false" />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup>
                                            <Label>Repetir Nova Senha</Label>
                                            <Input name="pass_new_r" placeholder="*******" type="password" autoComplete="false" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </div>
                            <div className='my-4'>
                                <Button color='success'>Salvar Senha</Button>
                            </div>
                        </Form>

                        </Card>
                    </Col>
                </Row>
            </section>
        </>
    )
}

export default UserView