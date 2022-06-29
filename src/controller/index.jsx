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
            },
            responseType: 'json',
            timeout: 9000000,
        }

        try {
            return await axios(request_params)
        } catch (error) {
            throw error
        }
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
}
