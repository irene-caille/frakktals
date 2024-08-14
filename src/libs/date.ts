export const formatDate = (date: Date) => {
	const day = `0${date.getDate()}`.slice(-2)
	const month = [
		'janvier',
		'février',
		'mars',
		'avril',
		'mai',
		'juin',
		'juillet',
		'août',
		'septembre',
		'octobre',
		'novembre',
		'décembre',
	][date.getMonth()]
	const year = date.getFullYear()
	return `${day} ${month} ${year}`
}
