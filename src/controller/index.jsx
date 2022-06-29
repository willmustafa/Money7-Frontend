import axios from 'axios'

export default class Request {
    constructor(){
        this.servicePath = ''
        this.requestPath = ''
        this.extraPath = ''
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
}
