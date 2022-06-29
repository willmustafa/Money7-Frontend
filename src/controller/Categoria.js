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
}