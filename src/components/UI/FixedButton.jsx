import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from './Base/Modal/Modal'
import TransacaoForm from '../../model/Forms/TransacaoForm'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import ObjetivoForm from '../../model/Forms/ObjetivoForm'

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
    height: 2rem;
    color: white
}
`

const FixedButton = () => {
    const [openModal, setOpenModal] = useState(false)
    const [dropdown, setDropdown] = useState(false)

    const [modalConfig, setModalConfig] = useState('despesa')

    function openModalButton(event){
      const caller = event.currentTarget.dataset.caller
      setModalConfig(caller)
      setOpenModal(true)
    }

    return (
        <>
        <CardIcon 
        className={`bg-danger text-white rounded-circle shadow`}
        >
          <Dropdown
            className=''
            direction="up"
            isOpen={dropdown}
            toggle={()=> setDropdown(!dropdown)}
          >
            <DropdownToggle color='transparent'>
              <FontAwesomeIcon icon={"plus"} /> 
            </DropdownToggle>
            <DropdownMenu
              end
              flip={false}
            >
              <DropdownItem data-caller='despesa' onClick={openModalButton} >
                Nova Despesa
              </DropdownItem>
              <DropdownItem data-caller='receita' onClick={openModalButton}>
                Nova Receita
              </DropdownItem>
              <DropdownItem data-caller='transferencia' onClick={openModalButton}>
                Nova Transferência
              </DropdownItem>
              <DropdownItem data-caller='objetivo' onClick={openModalButton}>
                Novo Objetivo
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardIcon>
        <Modal openModal={openModal} setOpenModal={setOpenModal} title={modalConfig}>
          {modalConfig != 'objetivo' ? (
            <TransacaoForm modalTypeTitle={modalConfig} />
          ): (
            <ObjetivoForm modalTypeTitle={modalConfig} />
          )}
        </Modal>
      </>
    )
}

export default FixedButton