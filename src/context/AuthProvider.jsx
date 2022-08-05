import React, { createContext, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(localStorage.getItem('jwt'))

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext