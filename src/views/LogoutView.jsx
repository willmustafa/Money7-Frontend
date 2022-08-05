import React from 'react'
import { useEffect } from 'react'
import useAuth from '../hooks/useAuth'

export const LogoutView = () => {
	const { setAuth } = useAuth()

	useEffect(()=>{
		setAuth(null)
		localStorage.removeItem('jwt')
	},[])


	return (
		<></>
	)
}
