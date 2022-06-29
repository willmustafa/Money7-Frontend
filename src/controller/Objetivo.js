import Request from './index'

export default class Objetivo extends Request {
    constructor(url){
        super()
        this.requestPath = '/objetivos'
        this.url = url
    }

    responseStructure(){
        return [{
            id_objetivo: 1,
            titulo: "Viagem Japão",
            cor: "bg-success",
            icone: "plane",
            valor_total: 10000,
            date: "2022-05-27",
            saldo_atual: 10000,
            categoria: {
                nome: "Viagem",
                cor: "bg-info",
                icone: "plane"
            }
        }]
    }

    _pathCreator(){
        return this.url + this.requestPath + this.extraPath
    }

    async get(params){
        const response = await this.executeRequest('GET', this._pathCreator(), null, params)
        return response.data
    }

    precisaEconomizar(atual, final, data){
        const diff = final - atual
        let diffMonth = (new Date(data).getMonth()) - (new Date().getMonth())
        let stringSucesso = `Você deve economizar R$ ${Number.parseFloat(diff/diffMonth).toFixed(2)} por mês.`
        
        if(diffMonth <= 0){
            return 'Objetivo finalizado.'
        }

        return stringSucesso
    }

    async save(id, data, exclude){
        const method = id !== 0 ? (exclude ? 'DELETE' : 'PUT'): 'POST'
        this.extraPath = id !== 0 ? '/'+id : ''

        const response = await this.executeRequest(method, this._pathCreator(), data)
        return response.data
    }
}