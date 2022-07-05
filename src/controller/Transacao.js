import Request from './index'

export default class Transacao extends Request {
	constructor(url){
		super()
		this.requestPath = '/transacoes'
		this.url = url
	}

	responseStructure(){
		return [{
			id: 1,
			valor: -50,
			descricao: 'Flores de dia dos namorados',
			date: '2022-05-27',
			categoria: {
				nome: 'Viagem',
				cor: 'bg-info',
				icone: 'plane'
			},
			conta: {
				instituicao: {
					nome: 'Dinheiro',
					cor: 'bg-success',
					icone: 'money-bill'
				}
			}
		}]
	}

	responseStructure_despesasPorCategoria(){
		return [{
			categoria: 'Remédios',
			valor: 500
		}]
	}

	responseStructure_somaMensal(){
		return {
			receita: 0,
			despesa: 0,
			saldo_atual: 0,
			saldo_total: 0,
			receita_perc_last: 0,
			despesa_perc_last: 0
		}
	}

	responseStructure_balancoMensal(){
		return [{
			date: 'February',
			saldo: 800
		},
		{
			date: 'December',
			saldo: 100
		}]
	}

	responseStructure_pendencias(){
		return [{
			despesa: 500,
			receita: 200
		}]
	}

	responseStructure_gastosReceitasMensal(){
		return [{
			date: 'Janeiro',
			despesa: 800,
			receita: 1000
		}]
	}

	responseStructure_receitasPorCategoria(){
		return [{
			categoria: 'Salário',
			valor: 500
		}]
	}

	get_despesasPorCategoria(params){
		this.requestPath = '/transacoesFiltradas/despesaCategoria'
		return this.get(params)
	}

	get_somaMensal(params){
		this.requestPath = '/transacoesFiltradas/somaMes'
		return this.get(params)
	}

	async get_balancoMensal(params){
		this.requestPath = '/transacoesFiltradas/balancoMensal'
		return await this.get(params)
	}

	get_pendencias(params){
		this.requestPath = '/transacoesFiltradas/pendencias'
		return this.get(params)
	}

	get_gastosReceitasMensal(params){
		this.requestPath = '/transacoesFiltradas/gastosReceitasMensal'
		return this.get(params)
	}

	get_receitasPorCategoria(params){
		this.requestPath = '/transacoesFiltradas/receitaCategoria'
		return this.get(params)
	}
}