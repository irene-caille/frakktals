export const slugify = (str: string) => {
	const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'.split('')
	const to = 'aaaaeeeeiiiioooouuuunc------'.split('')
	return (
		str
			.replace(/^\s+|\s+$/g, '') //trim
			.toLowerCase()
			// remove accents, swap ñ for n, etc
			.replace(new RegExp(from.join('|'), 'g'), (m) => {
				const index = from.findIndex((el) => el === m)
				return to[index] ?? 'z'
			})
			.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
			.replace(/(\s+|-+)/g, '-') // collapse whitespace and replace by -, collapse dashes
	)
}
