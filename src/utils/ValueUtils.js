function currency_formatter_abs(value){
    return Math.abs(Number.parseFloat(value)).toLocaleString("pt-BR", {minimumFractionDigits: 2, currency: "BRL", style: "currency"})
}

function currency_formatter(value){
    return Number.parseFloat(value).toLocaleString("pt-BR", {minimumFractionDigits: 2, currency: "BRL", style: "currency"})
}

module.exports = {
    currency_formatter,
    currency_formatter_abs
}