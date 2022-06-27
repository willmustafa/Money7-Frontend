import Modal from '../components/UI/Base/Modal/Modal'
import CardProgressIconTitle from '../components/UI/CardProgressIconTitle'
import PlusCardModalOpenner from '../components/UI/PlusCardModalOpenner'
import { apiPath } from '../controller/apiPath'
import ObjetivoForm from '../model/Forms/ObjetivoForm'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { useDate } from '../context/dateContext'
import axios from 'axios'

const ObjetivosView = () => {
    const {date} = useDate()

    const [dados, setDados] = useState([{
        id_objetivo: 1,
        titulo: "Viagem Japão",
        cor: "bg-success",
        icone: "plane",
        valor_total: 10000,
        date: "2022-05-27",
        saldo_atual: 10000,
        categoria: {
            nome: "Viagem",
            cor: "bg-info",
            icone: "plane"
        }
    }])   

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}${apiPath.objetivos}?date=${(new Date(date)).toISOString()}`)
        .then(res => setDados(res.data))
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

    function precisaEconomizar(atual, final, data){
        const diff = final - atual
        let diffMonth = (new Date(data).getMonth()) - (new Date().getMonth())
        let stringSucesso = `Você deve economizar R$ ${Number.parseFloat(diff/diffMonth).toFixed(2)} por mês.`
        
        if(diffMonth <= 0){
            return 'Objetivo finalizado.'
        }

        return stringSucesso
    }

    return (
        <Col xl="4" md="12" className='mb-md-4'>
            <CardProgressIconTitle
                    title={item.titulo}
                    smallTitle={item.categoria.nome}
                    icon={item.categoria.icone}
                    bgColor={item.cor}
                    value={item.saldo_atual}
                    max={item.valor_total}
                    dataConclusao={new Date(item.date).toLocaleDateString('pt-br')}
                    cardClassName="flex-row align-items-center"
                    onClick={() => setOpenModal(true)}
                    cartao
                    footerLeft={`${precisaEconomizar(item.saldo_atual, item.valor_total, item.date)}`}
                    />
            <Modal openModal={openModal} setOpenModal={setOpenModal} title={"Editar Objetivo"}>
                <ObjetivoForm {...item} />
            </Modal>
        </Col> 
    )
}

export default ObjetivosView