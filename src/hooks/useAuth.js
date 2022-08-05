import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'

const useAuth = () => {
	const { auth } = useContext(AuthContext)

	if(auth){
		localStorage.setItem('jwt', auth)
	}
	return useContext(AuthContext)
}

export default useAuth