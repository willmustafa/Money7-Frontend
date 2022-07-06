import Request from './index'

export default class Instituicao extends Request {
	constructor(url, auth){
		super()
		this.requestPath = '/instituicoes'
		this.auth = auth
		this.url = url
	}

	responseStructure(){
		return [{
			id_instituicao: 1,
			nome: 'Dinheiro',
			cor: 'bg-success',
			icone: 'money-bill'
		}]
	}
}