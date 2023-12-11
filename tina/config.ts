import { defineConfig } from 'tinacms'

// Your hosting provider likely exposes this as an environment variable
const branch =
	process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || 'main'

export default defineConfig({
	branch,

	// Get this from tina.io
	clientId: process.env.TINA_CLIENT_ID,
	// Get this from tina.io
	token: process.env.TINA_TOKEN,

	build: {
		outputFolder: 'admin',
		publicFolder: 'public'
	},
	media: {
		tina: {
			mediaRoot: '/src/content/assets',
			publicFolder: ''
		}
	},
	// See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
	schema: {
		collections: [
			{
				name: 'settings',
				label: 'Réglages généraux',
				path: 'src/content/settings',
				format: 'json',
				ui: {
					allowedActions: {
						create: false,
						delete: false
					}
				},
				fields: [
					{
						type: 'string',
						name: 'title',
						label: 'Titre du site'
					},
					{
						type: 'string',
						name: 'logoColor',
						label: 'Couleur du logo',
						options: [
							'slate',
							'gray',
							'zinc',
							'neutral',
							'stone',
							'red',
							'orange',
							'amber',
							'yellow',
							'lime',
							'green',
							'emerald',
							'teal',
							'cyan',
							'sky',
							'blue',
							'indigo',
							'violet',
							'purple',
							'fuchsia',
							'pink',
							'rose'
						],
						required: true
					},
					{
						type: 'string',
						name: 'primaryColor',
						label: 'Couleur du fond',
						options: [
							'slate',
							'gray',
							'zinc',
							'neutral',
							'stone',
							'red',
							'orange',
							'amber',
							'yellow',
							'lime',
							'green',
							'emerald',
							'teal',
							'cyan',
							'sky',
							'blue',
							'indigo',
							'violet',
							'purple',
							'fuchsia',
							'pink',
							'rose'
						],
						required: true
					},
					{
						type: 'string',
						name: 'linksColor',
						label: 'Couleur des liens',
						options: [
							'slate',
							'gray',
							'zinc',
							'neutral',
							'stone',
							'red',
							'orange',
							'amber',
							'yellow',
							'lime',
							'green',
							'emerald',
							'teal',
							'cyan',
							'sky',
							'blue',
							'indigo',
							'violet',
							'purple',
							'fuchsia',
							'pink',
							'rose'
						],
						required: true
					}
				]
			},
			{
				name: 'articles',
				label: 'Articles',
				path: 'src/content/articles',
				format:'mdx',
				fields: [
					{
						type: 'string',
						name: 'title',
						label: 'Title',
						isTitle: true,
						required: true
					},
					{
						type: 'datetime',
						name: 'date',
						label: 'Date',
						required: true
					},
					{
						type: 'reference',
						collections: ['categories'],
						name: 'category',
						label: 'Catégorie',
						required: true
					},
					{
						type: 'image',
						name: 'image',
						label: 'Couverture',
						required: true
					},
					{
						type: 'string',
						name: 'altImage',
						label: 'Texte alternatif'
					},
					{
						type: 'object',
						name: 'references',
						label: 'Références',
						list: true,
						ui: {
							// itemProps: (item) => {
							// 	// Field values are accessed by item?.<Field name>
							// 	return { label: item?.title }
							// }
						},
						fields: [
							{
								type: 'image',
								name: 'image',
								label: 'Image',
								required: true
							},
							{
								type: 'string',
								name: 'title',
								label: 'Titre'
							},
							{
								type: 'string',
								name: 'author',
								label: 'Author'
							},
							{
								type: 'string',
								name: 'other',
								label: 'Autres'
							}
						]
					},
					{
						type: 'rich-text',
						name: 'body',
						label: 'Body',
						isBody: true
					}
				]
			},
			{
				name: 'galeries',
				label: 'Galeries',
				path: 'src/content/galeries',
				fields: [
					{
						type: 'string',
						name: 'title',
						label: 'Title',
						isTitle: true,
						required: true
					},
					{
						type: 'datetime',
						name: 'date',
						label: 'Date',
						required: true
					},
					{
						type: 'image',
						name: 'images',
						list: true,
						required: true
					}
				]
			},
			{
				name: 'categories',
				label: 'Catégories',
				path: 'src/content/categories',
				fields: [
					{
						type: 'string',
						name: 'title',
						isTitle: true,
						required: true
					}
				]
			}
		]
	}
})
