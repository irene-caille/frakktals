import { getEntry } from 'astro:content'

export const sortByDate = <T extends { data: { date: Date } }>(
	elements: T[],
) => {
	return elements.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}

export const getCategory = async (slug: string) =>
	(await getEntry('categories', slug))?.data?.title
