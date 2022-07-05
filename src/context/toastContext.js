import React, { createContext, useState, useContext } from 'react'

const ToastContext = createContext()

export default function ToastProvider({children}){
	const [toast, setToast] = useState(false)

	return (
		<ToastContext.Provider
			value={{
				toast,
				setToast
			}}
		>
			{children}
		</ToastContext.Provider>
	)
}

export function useToast(){
	const context = useContext(ToastContext)
	const {toast, setToast} = context
	return {toast, setToast}
}