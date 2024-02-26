import { z, defineCollection } from 'astro:content'
import { config } from '../libs/siteConfig.ts'

// 2. Define a `type` and `schema` for each collection
const articlesCollection = defineCollection({
	type: 'content', // v2.5.0 and later
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			date: z.date(),
			category: z.string(),
			image: image(),
			altImage: z.string().optional(),
			references: z
				.array(
					z.object({
						title: z.string().optional(),
						author: z.string().optional(),
						other: z.string().optional(),
						image: image().optional()
					})
				)
				.optional()
		})
})

const galeriesCollection = defineCollection({
	type: 'content', // v2.5.0 and later
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			date: z.date(),
			images: z.array(image())
		})
})

const categoriesCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string()
	})
})

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
	articles: articlesCollection,
	galeries: galeriesCollection,
	categories: categoriesCollection
}
