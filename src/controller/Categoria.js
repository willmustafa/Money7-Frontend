import Request from './index'

export default class Categoria extends Request {
    constructor(url){
        super()
        this.requestPath = '/categorias'
        this.url = url
    }

    responseStructure(){
        return [{
            id_categoria: 1,
            nome: "",
            cor: "",
            tipo: ""
        }]
    }

    _pathCreator(){
        return this.url + this.requestPath
    }

    async get(params){
        const response = await this.executeRequest('GET', this._pathCreator(), null, params)
        return response.data
    }

}