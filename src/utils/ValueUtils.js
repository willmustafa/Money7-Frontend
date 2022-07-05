function currency_formatter_abs(value){
	return Math.abs(Number.parseFloat(value)).toLocaleString('pt-BR', {minimumFractionDigits: 2, currency: 'BRL', style: 'currency'})
}

function currency_formatter(value){
	return Number.parseFloat(value).toLocaleString('pt-BR', {minimumFractionDigits: 2, currency: 'BRL', style: 'currency'})
}

function stringToIsoDate(date){
	var dateArray = date.split('-')
	var month = dateArray[1]
	return `${dateArray[2]}/${month}/${dateArray[0]}`
}

function sortByMonth(arr) {
	var months = ['January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December']
	return arr.sort(function(a, b){
		return months.indexOf(a.date) - months.indexOf(b.date)
	})
}

function ChartLabelFormatter(value){
	if(value)
		return value.label + ': ' + currency_formatter(value.raw)
}

module.exports = {
	currency_formatter,
	currency_formatter_abs,
	stringToIsoDate,
	sortByMonth,
	ChartLabelFormatter
}