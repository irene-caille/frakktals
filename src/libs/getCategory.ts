import { getCollection } from 'astro:content'

export const getCategory = async (path: string) => {
	const fileName = path.split('/')?.at(-1)
	if (!fileName) return
	const categories = await getCollection('categories')
	return categories.find((c) => c.id === fileName)?.data.title
}
