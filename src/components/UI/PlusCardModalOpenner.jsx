import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Card from './Base/Card/Card'
import RoundIcon from './Base/Icon/RoundIcon'
import Modal from './Base/Modal/Modal'

const Centered = styled.div`
max-height: 13rem;
height: 100%;
display: flex;
flex-direction: column;
-moz-box-align: center;
align-items: center;
-moz-box-pack: center;
justify-content: center;
cursor: pointer;
`

const PlusCardModalOpenner = props => {
    const [openModal, setOpenModal] = useState(false)
    
    return (
        <>
        <Card className={"p-4"} onClick={() => setOpenModal(true)}>
            <Centered>
              <RoundIcon icon={props.icon} bgColor={props.bgColor}/>
              <h4 className="mt-3">{props.title}</h4>
            </Centered>
            {props.children}
        </Card>
        <Modal openModal={openModal} setOpenModal={setOpenModal} title={props.modalTitle}>
          {props.form}
        </Modal>
    </>
    )
}

PlusCardModalOpenner.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    icon: PropTypes.string,
    bgColor: PropTypes.string,
    modalTitle: PropTypes.string.isRequired,
    form: PropTypes.element.isRequired
}


PlusCardModalOpenner.defaultProps = {
    bgColor: "bg-danger",
    icon: "plus",
    title: "Novo"
}

export default PlusCardModalOpenner