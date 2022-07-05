import Request from './index'

export default class Cartao extends Request {
	constructor(url){
		super()
		this.requestPath = '/cartoes'
		this.url = url
	}

	responseStructure(){
		return [{
			id_conta: 41,
			id_instituicao: 2,
			id_cartao: 4,
			saldo_atual: 0,
			instituicao: {
				nome: 'NuBank',
				cor: 'bg-nubank',
				icone: 'icon-nubank'
			},
			cartao: {
				limite: 5600,
				vencimento: 8,
				fechamento: 15
			}
		}]
	}
}