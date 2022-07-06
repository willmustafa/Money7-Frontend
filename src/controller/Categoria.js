import Request from './index'

export default class Categoria extends Request {
	constructor(url, auth){
		super()
		this.requestPath = '/categorias'
		this.auth = auth
		this.url = url
	}

	responseStructure(){
		return [{
			id_categoria: 1,
			nome: '',
			cor: '',
			tipo: ''
		}]
	}
}