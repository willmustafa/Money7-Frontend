import Request from './index'

export default class Tag extends Request {
	constructor(url, auth){
		super()
		this.requestPath = '/tags'
		this.auth = auth
		this.url = url
	}

	responseStructure(){
		return [{
			id: 1,
			nome: '',
		}]
	}
}