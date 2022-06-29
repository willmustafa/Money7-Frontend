import Request from './index'

export default class Cartao extends Request {
    constructor(url){
        super()
        this.requestPath = '/cartoes'
        this.url = url
    }

    responseStructure(){
        return [{
            id_cartao: 1,
            id_instituicao: 1,
            limite: 0,
            fechamento: 10,
            vencimento: 8,
            instituicao: {
                nome: "Dinheiro",
                cor: "bg-success",
                icone: "money-bill"
            }
        }]
    }
}