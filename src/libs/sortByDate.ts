export const sortBydate = <T extends { data: { date: Date } }>(elements: T[]) => {
	return elements.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}
