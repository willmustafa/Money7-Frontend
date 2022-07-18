function currency_formatter_abs(value){
	return Math.abs(Number.parseFloat(value)).toLocaleString('pt-BR', {minimumFractionDigits: 2, currency: 'BRL', style: 'currency', useGrouping: true})
}

function currency_formatter(value){
	return Number.parseFloat(value).toLocaleString('pt-BR', {minimumFractionDigits: 2, currency: 'BRL', style: 'currency', useGrouping: true})
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
		return value.label + ': ' + currency_formatter_abs(value.raw)
}

function fixedValue2Decimals(value){
	if(value)
		return Number.parseFloat(value).toFixed(2).replace('.',',')
}

module.exports = {
	currency_formatter,
	currency_formatter_abs,
	stringToIsoDate,
	sortByMonth,
	ChartLabelFormatter,
	fixedValue2Decimals
}