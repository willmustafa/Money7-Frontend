import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from './Base/Modal/Modal'
import TransacaoForm from '../../model/Forms/TransacaoForm'

const CardIcon = styled.div`
padding: 12px;
text-align: center;
align-items: center;
justify-content: center;
border-radius: 50%;
width: 4rem;
height: 4rem;
position: fixed;
right: 4rem;
bottom: 4rem;
cursor: pointer;
opacity: 0.6;
transition: opacity 0.4s ease;
display: flex;

&:hover{
    opacity: 1
}

& svg{
    height: 2rem
}
`

const FixedButton = () => {
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
        <CardIcon 
        className={`bg-danger text-white rounded-circle shadow`}
        onClick={() => setOpenModal(true)}
        >
          <FontAwesomeIcon icon={"plus"} />
        </CardIcon>
        <Modal openModal={openModal} setOpenModal={setOpenModal} title={"Nova transação"}>
          <TransacaoForm />
        </Modal>
      </>
    )
}

export default FixedButton