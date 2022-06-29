import Request from './index'

export default class Instituicao extends Request {
    constructor(url){
        super()
        this.requestPath = '/instituicoes'
        this.url = url
    }

    _pathCreator(){
        return this.url + this.requestPath
    }

    async get(){
        const response = await this.executeRequest('GET', this._pathCreator())
        return response.data
    }
}