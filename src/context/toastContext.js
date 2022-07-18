import React, { createContext, useState, useContext } from 'react'
import { toast } from 'react-toastify'

const ToastContext = createContext()

export default function ToastProvider({children}){
	const [toastObj, setToastObj] = useState({
		type: toast.TYPE.INFO,
		text: 'Olá'
	})

	return (
		<ToastContext.Provider
			value={{
				toastObj,
				setToastObj
			}}
		>
			{children}
		</ToastContext.Provider>
	)
}

export function useToast(){
	const context = useContext(ToastContext)
	const {toastObj, setToastObj} = context
	return {toastObj, setToastObj}
}