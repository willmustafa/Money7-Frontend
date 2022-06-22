import Modal from '../components/UI/Base/Modal/Modal'
import CardProgressIconTitle from '../components/UI/CardProgressIconTitle'
import PlusCardModalOpenner from '../components/UI/PlusCardModalOpenner'
import { apiPath } from '../controller/apiPath'
import ObjetivoForm from '../model/Forms/ObjetivoForm'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { useDate } from '../context/dateContext'

const ObjetivosView = () => {
    const {date} = useDate()

    const [dados, setDados] = useState([{
        id_objetivo: 1,
        titulo: "",
        cor: "",
        icone: "plus",
        valor_total: 0,
        date: "",
        categoria: {
            nome: "",
            cor: "bg-info",
            icone: "plane"
        }
  }])    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}${apiPath.objetivos}`)
        .then(res => res.json())
        .then(res => setDados(res))
        .catch(err => console.error(err))
    }, [date])
    return (
        <>
            <div className="main-header">
            </div>
            <section className='mt-n-7 container'>
                <Row className="mb-5">
                    <Col xl="4" md="12" className='mb-md-4'>
                        <PlusCardModalOpenner 
                        modalTitle='Novo Objetivo'
                        form={<ObjetivoForm />}
                        />
                    </Col>
                    {dados.map((item) => {
                        return <ObjetivosCard {...item} key={item.id_objetivo} />
                        })}
                </Row>
            </section>
        </>
  )
}

const ObjetivosCard = item => {
    const [openModal, setOpenModal] = useState(false)

    return (
        <Col xl="4" md="12" className='mb-md-4'>
            <CardProgressIconTitle
                    title={item.titulo}
                    smallTitle={item.categoria.nome}
                    icon={item.icone}
                    bgColor={item.cor}
                    value={item.valor_atual}
                    max={item.valor_total}
                    cardClassName="flex-row align-items-center"
                    onClick={() => setOpenModal(true)}
                    />
            <Modal openModal={openModal} setOpenModal={setOpenModal} title={"Editar Objetivo"}>
                <ObjetivoForm {...item} />
            </Modal>
        </Col> 
    )
}

export default ObjetivosView