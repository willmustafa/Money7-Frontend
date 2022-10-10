import Request from './index'

export default class Transacao extends Request {
	constructor(url, auth){
		super()
		this.requestPath = '/transacoes'
		this.auth = auth
		this.url = url
	}

	responseStructure(){
		return [{
			id: '0ac1c014-6760-43ad-88e4-effb1dd5e944',
			valor: 10000,
			descricao: 'Dinheiro de objetivo',
			date: '2022-07-05',
			['categoria.id_categoria']: 37,
			titulo: 'Viagem Japão',
			id_categoria: 1,
			cor: 'bg-primary',
			['categoria.nome']: 'dinheiro guardado',
			['categoria.cor']: 'bg-success',
			['categoria.icone']: 'building-columns',
			['conta.id_conta']: 21,
			['conta.saldo']: 0,
			['conta.date']: '2022-06-25',
			['conta.contaObjetivo']: true,
			['conta.createdAt']: '2022-06-25T17:09:08.243Z',
			['conta.updatedAt']: '2022-06-25T17:09:08.243Z',
			['conta.id_instituicao']: null,
			['conta.id_users']: 1,
			['conta.id_cartao']: null,
			['conta.instituicao.id_instituicao']: null,
			['conta.instituicao.nome']: null,
			['conta.instituicao.cor']: null,
			['conta.instituicao.icone']: null
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

	get_desempenho(params){
		this.requestPath = '/transacoesFiltradas/desempenho'
		return this.get(params)
	}

	get_transacoesFuturas(params){
		this.requestPath = '/transacoesFuturas/'
		return this.get(params)
	}
}