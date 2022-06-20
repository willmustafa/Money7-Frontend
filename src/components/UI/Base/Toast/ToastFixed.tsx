import { useToast } from 'context/toastContext';
import React, { useEffect } from 'react'
import {Toast, ToastHeader, ToastBody} from 'reactstrap'

const ToastFixed = () => {
    const {toast, setToast} = useToast()

    useEffect(()=> {
        if(toast){
            window.setTimeout(() => setToast(!toast), 500)
        }
    }, [toast])
    
    return (
        <Toast isOpen={toast} color="sucess">
            <ToastHeader toggle={setToast(!toast)}>
                Conta
            </ToastHeader>
            <ToastBody>
                Sucesso!
            </ToastBody>
        </Toast>
    );
}

export default ToastFixed