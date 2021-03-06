import Request from './index'

export default class Conta extends Request {
	constructor(url, auth){
		super()
		this.requestPath = '/contas'
		this.auth = auth
		this.url = url
	}

	responseStructure(){
		return [{
			id_conta: 1,
			date: '2022-05-01',
			saldo: 0,
			instituicao: {
				nome: '',
				cor: '',
				icone: 'plus'
			}
		}]
	}

	get_saldoAtual(params){
		this.requestPath = '/contasFiltradas/saldoAtualPrevisto'
		return this.get(params)
	}

	get_contaCartao(params){
		this.requestPath = '/contasFiltradas/contasCartoes'
		return this.get(params)
	}
}