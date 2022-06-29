import Request from './index'

export default class Instituicao extends Request {
    constructor(url){
        super()
        this.requestPath = '/instituicoes'
        this.url = url
    }

    responseStructure(){
        return [{
            id_instituicao: 1,
            nome: "Dinheiro",
            cor: "bg-success",
            icone: "money-bill"
        }]
    }
}