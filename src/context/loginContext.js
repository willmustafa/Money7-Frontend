export const TOKEN_KEY = 'Money-Token'

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export function getName(){
	return localStorage.getItem('name')
}

export function getEmail(){
	return localStorage.getItem('email')
}

export function getId(){
	return localStorage.getItem('userid')
}

export const login = (token, name, email, userid) => {
	localStorage.setItem(TOKEN_KEY, token)
	localStorage.setItem('name', name)
	localStorage.setItem('email', email)
	localStorage.setItem('userid', userid)
}

export const logout = () => {
	localStorage.removeItem(TOKEN_KEY)
	localStorage.removeItem('name')
	localStorage.removeItem('email')
	localStorage.removeItem('userid')
}