import Request from './index'

export default class Scrapper extends Request {
	constructor(url, auth){
		super()
		this.requestPath = '/nubank'
		this.auth = auth
		this.url = url
	}

	responseStructure(){
		return {}
	}
}