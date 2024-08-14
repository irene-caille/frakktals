import { defineCollection, z } from 'astro:content'

export const collections = {
	articles: defineCollection({
		type: 'content',
		schema: ({ image }) =>
			z.object({
				title: z.string(),
				date: z.date(),
				category: z.string(),
				thumbnail: z.object({
					image: image(),
					alt: z.string().optional(),
				}),
				references: z
					.array(
						z.object({
							title: z.string().optional(),
							author: z.string().optional(),
							other: z.string().optional(),
							image: image(),
							alt: z.string().optional(),
						}),
					)
					.optional(),
			}),
	}),
	galeries: defineCollection({
		type: 'content',
		schema: ({ image }) =>
			z.object({
				title: z.string(),
				date: z.date(),
				images: z.array(image()),
			}),
	}),
	categories: defineCollection({
		type: 'content',
		schema: z.object({
			title: z.string(),
		}),
	}),
}
