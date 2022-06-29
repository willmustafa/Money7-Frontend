import Request from './index'

export default class Conta extends Request {
    constructor(url){
        super()
        this.requestPath = '/contas'
        this.url = url
    }

    responseStructure(){
        return [{
            id_conta: 1,
            date: "2022-05-01",
            saldo: 0,
            instituicao: {
                nome: "",
                cor: "",
                icone: "plus"
            }
        }]
    }

    get_saldoAtual(params){
        this.requestPath = '/contasFiltradas/saldoAtualPrevisto'
        return this.get(params)
    }
}