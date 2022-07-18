import axios from 'axios'

export default class Request {
	constructor(){
		this.servicePath = ''
		this.requestPath = ''
		this.extraPath = ''
	}

	_pathCreator(){
		return this.url + this.requestPath + this.extraPath
	}

	async executeRequest(requestType, urlPath, body = null, params = null, headers = {}){
		const url = `${urlPath}`
		const request_params = {
			method: requestType,
			url,
			params,
			data: body,
			headers: {
				...headers,
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.auth}`
			},
			responseType: 'json',
			timeout: 9000000,
			withCredentials: true
		}
		return await axios(request_params)
	}

	async save(id, data, exclude){
		const method = id !== 0 ? (exclude ? 'DELETE' : 'PUT'): 'POST'
		this.extraPath = id !== 0 ? '/'+id : ''

		const response = await this.executeRequest(method, this._pathCreator(), data)
		return response.data
	}

	async get(params){
		const response = await this.executeRequest('GET', this._pathCreator(), null, params)
		return response.data
	}

	async save_file(id_conta, files, exclude){
		const formData = new FormData()
		for (const file of files){
			formData.append('file', file)
		}
		formData.append('id_conta', id_conta)
		if(exclude) formData.append('excluir', exclude)

		const config = {
			headers: {
				'content-type': 'multipart/form-data',
				Authorization: `Bearer ${this.auth}`
			},
			responseType: 'json',
			timeout: 9000000,
			withCredentials: true
		}
		console.log(this._pathCreator())
		return axios.post(this._pathCreator(), formData, config).then(res => res.data)
	}
}
