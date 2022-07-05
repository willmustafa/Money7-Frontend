import Request from './index'

export default class Scrapper extends Request {
	constructor(url){
		super()
		this.requestPath = '/nubank'
		this.url = url
	}

	responseStructure(){
		return {}
	}
}