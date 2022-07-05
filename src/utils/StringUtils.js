function capitalize(string){
	if(string)
		return string.split(' ')
			.map(item => item.charAt(0).toUpperCase() + item.slice(1))
			.join(' ')
}

module.exports = {
	capitalize
}