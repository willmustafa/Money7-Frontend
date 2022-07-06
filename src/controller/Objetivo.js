import Request from './index'

export default class Objetivo extends Request {
	constructor(url, auth){
		super()
		this.requestPath = '/objetivos'
		this.auth = auth
		this.url = url
	}

	responseStructure(){
		return [{
			id_objetivo: 1,
			titulo: 'Viagem Japão',
			cor: 'bg-success',
			icone: 'plane',
			valor_total: 10000,
			date: '2022-05-27',
			saldo_atual: 10000,
			id_conta: 1,
			categoria: {
				nome: 'Viagem',
				cor: 'bg-info',
				icone: 'plane'
			}
		}]
	}

	precisaEconomizar(atual, final, data){
		const diff = final - atual
		let diffMonth = (new Date(data).getMonth()) - (new Date().getMonth())
		let stringSucesso = `Você deve economizar R$ ${Number.parseFloat(diff/diffMonth).toFixed(2)} por mês.`
        
		if(diffMonth <= 0 || Number.parseFloat(diff/diffMonth) <= 0){
			return 'Objetivo finalizado!'
		}

		return stringSucesso
	}
}