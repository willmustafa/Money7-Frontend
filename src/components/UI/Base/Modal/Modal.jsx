import React from 'react'
import PropTypes from 'prop-types'
import { Modal as ModalBs, ModalHeader, ModalBody } from 'reactstrap'

const Modal = props => {
    return (
      <ModalBs
          centered
          scrollable
          size="lg"
          toggle={() => props.setOpenModal(!props.openModal)}
          isOpen={props.openModal}
      >
        <ModalHeader toggle={() => props.setOpenModal(!props.openModal)}>
          {props.title}
        </ModalHeader>
        <ModalBody>
          {React.Children.map(props.children, child => React.cloneElement(child, {
            closeModal: () => props.setOpenModal(!props.openModal)
            }))}
        </ModalBody>
      </ModalBs>
    )
}

Modal.propTypes = {
    /** Function to open the modal, useState(boolean) */
    setOpenModal: PropTypes.func.isRequired,
    /** Boolean variable */
    openModal: PropTypes.bool.isRequired,
    /** Modal Title, displayed in the header */
    title: PropTypes.string.isRequired,
    /** The inside of the Modal */
    children: PropTypes.node.isRequired
}

Modal.defaultProps = {
    children: <p>Not Loaded</p>
}

export default Modal