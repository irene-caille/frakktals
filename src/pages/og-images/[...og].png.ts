import fs from 'node:fs/promises'
import { getCollection } from 'astro:content'
import { Transformer } from '@napi-rs/image'
import type { APIRoute, GetStaticPaths } from 'astro'
import satori from 'satori'
import OgImageMarkup from '../../components/OgImageMarkup.tsx'

export const getStaticPaths = (async () => {
	const articles = (await getCollection('articles')).map((el) => ({
		params: { og: `/articles/${el.slug}` },
		props: { title: el.data.title },
	}))
	const galleries = (await getCollection('galeries')).map((el) => ({
		params: { og: `/galeries/${el.slug}` },
		props: { title: el.data.title },
	}))
	const categories = (await getCollection('categories')).map((el) => ({
		params: { og: `/categories/${el.slug}` },
		props: { title: el.data.title },
	}))
	const Home = {
		params: { og: 'home' },
		props: { title: 'Accueil' },
	}
	const HomeGalleries = {
		params: { og: 'galeries/home' },
		props: { title: 'Galeries' },
	}
	return [...articles, ...galleries, ...categories, Home, HomeGalleries]
}) satisfies GetStaticPaths

export const GET: APIRoute = async ({ props }) => {
	const chewiData = await fs.readFile('./public/chewy-latin-400-normal.woff')
	const svg = await satori(OgImageMarkup({ title: props.title }), {
		width: 1200,
		height: 630,
		fonts: [
			{
				name: 'Chewi',
				data: chewiData,
				style: 'normal',
			},
		],
	})
	const PNG = await Transformer.fromSvg(svg).crop(0, 0, 1200, 630).png()
	return new Response(PNG, {
		headers: {
			'Content-Type': 'image/png',
		},
	})
}
