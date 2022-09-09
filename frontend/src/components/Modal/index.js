import React from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const ModalView = (props) => {

    return (
        <Modal
            open={props.isOpen}
            onClose={props.onClose}
            center
        >
            {props.children}
        </Modal>
    )
}

export default ModalView;
