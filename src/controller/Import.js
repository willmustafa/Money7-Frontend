import Request from './index'

export default class Import extends Request {
	constructor(url, auth){
		super()
		this.requestPath = '/import/from-file'
		this.auth = auth
		this.url = url
	}
}