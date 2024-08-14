import { collection, config, fields, singleton } from '@keystatic/core'
import { block } from '@keystatic/core/content-components'

const colorsOptions = [
	{ value: 'slate', label: 'slate' },
	{ value: 'gray', label: 'gray' },
	{ value: 'zinc', label: 'zinc' },
	{ value: 'neutral', label: 'neutral' },
	{ value: 'stone', label: 'stone' },
	{ value: 'red', label: 'red' },
	{ value: 'orange', label: 'orange' },
	{ value: 'amber', label: 'amber' },
	{ value: 'yellow', label: 'yellow' },
	{ value: 'lime', label: 'lime' },
	{ value: 'green', label: 'green' },
	{ value: 'emerald', label: 'emerald' },
	{ value: 'teal', label: 'teal' },
	{ value: 'cyan', label: 'cyan' },
	{ value: 'sky', label: 'sky' },
	{ value: 'blue', label: 'blue' },
	{ value: 'indigo', label: 'indigo' },
	{ value: 'violet', label: 'violet' },
	{ value: 'purple', label: 'purple' },
	{ value: 'fuchsia', label: 'fuchsia' },
	{ value: 'pink', label: 'pink' },
	{ value: 'rose', label: 'rose' },
]

export default config({
	storage: import.meta.env.DEV
		? {
				kind: 'local',
			}
		: {
				kind: 'cloud',
			},
	cloud: {
		project: 'arplastoc/site',
	},
	collections: {
		articles: collection({
			label: 'Articles',
			slugField: 'title',
			columns: ['title', 'category', 'date'],
			path: 'src/content/articles/*',
			format: { contentField: 'content' },
			entryLayout: 'content',
			schema: {
				title: fields.slug({ name: { label: 'Titre' } }),
				date: fields.date({ label: 'Date', validation: { isRequired: true } }),
				category: fields.relationship({
					label: 'Catégorie',
					collection: 'categories',
					validation: { isRequired: true },
				}),
				thumbnail: fields.object(
					{
						image: fields.image({
							label: 'Image',
							directory: 'src/content/assets/articles',
							publicPath: 'src/content/assets/articles',
							validation: { isRequired: true },
						}),
						alt: fields.text({ label: 'Description alternative' }),
					},
					{ label: 'Image de couverture' },
				),
				references: fields.array(
					fields.object({
						image: fields.image({
							label: 'Image',
							directory: 'src/content/assets/articles',
							publicPath: 'src/content/assets/articles',
							validation: { isRequired: true },
						}),
						alt: fields.text({ label: 'Description alternative' }),
						title: fields.text({ label: 'Titre' }),
						author: fields.text({ label: 'Auteur' }),
						other: fields.text({ label: 'Autre' }),
					}),
					{
						label: 'Références',
						itemLabel: (props) => props.fields.title.value,
					},
				),
				content: fields.mdx({
					label: 'Content',
					description:
						'Attention les images intégrés dans le corps du texte doivent avoir des noms de fichiers uniquement composés de caractères minuscules et chiffres.',
					options: {
						image: {
							directory: 'src/content/assets/articles',
							publicPath: 'src/content/assets/articles/',
						},
						table: false,
						code: false,
						codeBlock: false,
					},
					components: {
						Quiz: block({
							label: 'Quiz',
							schema: {
								question: fields.text({
									label: 'Question',
									validation: { isRequired: true },
								}),
								options: fields.array(
									fields.object({
										text: fields.text({
											label: 'Contenu',
											validation: { isRequired: true },
										}),
										isCorrect: fields.checkbox({ label: 'Correcte ?' }),
									}),
									{
										label: 'Options',
										itemLabel: (props) => props.fields.text.value,
									},
								),
							},
						}),
						Eval: block({
							label: 'Évaluation',
							schema: {
								rows: fields.array(
									fields.text({ label: 'Texte', multiline: true }),
									{
										label: "Critères d'évaluation",
										itemLabel: (props) => props.value,
									},
								),
							},
						}),
						YoutubeEmbed: block({
							label: 'Vidéo youtube',
							schema: {
								src: fields.text({
									label: 'Url',
									validation: { isRequired: true },
								}),
							},
						}),
					},
				}),
			},
		}),
		categories: collection({
			label: 'Catégories',
			slugField: 'title',
			path: 'src/content/categories/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({ name: { label: 'Title' } }),
				content: fields.emptyContent({ extension: 'mdx' }),
			},
		}),
		galleries: collection({
			label: 'Galeries',
			slugField: 'title',
			path: 'src/content/galeries/*',
			format: { contentField: 'content' },
			columns: ['title', 'date'],
			schema: {
				title: fields.slug({ name: { label: 'Title' } }),
				date: fields.date({ label: 'Date', validation: { isRequired: true } }),
				images: fields.array(
					fields.image({
						label: 'Image',
						directory: 'src/content/assets/galeries',
						publicPath: 'src/content/assets/galeries',
						validation: { isRequired: true },
					}),
				),
				content: fields.emptyContent({ extension: 'mdx' }),
			},
		}),
	},
	singletons: {
		settings: singleton({
			label: 'Réglages',
			path: 'settings',
			format: 'json',
			schema: {
				title: fields.text({ label: 'text', validation: { isRequired: true } }),
				url: fields.text({
					label: 'Url du site',
					validation: { isRequired: true },
				}),
				favicon: fields.text({
					label: 'Icône du site',
					validation: { isRequired: true },
				}),
				logoColor: fields.select({
					options: colorsOptions,
					label: 'Couleur du logo',
					defaultValue: 'red',
					description: 'Voir https://tailwindcss.com/docs/customizing-colors',
				}),
				primaryColor: fields.select({
					options: colorsOptions,
					label: 'Couleur principale',
					defaultValue: 'orange',
					description: 'Voir https://tailwindcss.com/docs/customizing-colors',
				}),
			},
		}),
		seo: singleton({
			label: 'Seo',
			path: 'seo',
			format: 'json',
			schema: {
				home: fields.object(
					{
						descriptions: fields.text({
							label: 'Description',
							validation: { isRequired: true },
						}),
					},
					{ label: "Page d'accueil" },
				),
				category: fields.object(
					{
						descriptions: fields.text({
							label: 'Description',
							description:
								'Les %category% seront remplacés par la catégorie sélectionnée.',
							validation: { isRequired: true },
						}),
					},
					{ label: 'Pages Catégories' },
				),
				article: fields.object(
					{
						descriptions: fields.text({
							label: 'Description',
							description:
								"Les %title% seront remplacés par le titre de l'article, Les %category% seront remplacés par la catégorie sélectionnée.",
							validation: { isRequired: true },
						}),
					},
					{ label: 'Pages article' },
				),
				references: fields.object(
					{
						descriptions: fields.text({
							label: 'Description',
							description:
								"Les %title% seront remplacés par le titre de l'article, Les %category% seront remplacés par la catégorie sélectionnée.",
							validation: { isRequired: true },
						}),
					},
					{ label: "Pages des références d'un articles" },
				),
				galleries: fields.object(
					{
						descriptions: fields.text({
							label: 'Description',
							validation: { isRequired: true },
						}),
					},
					{ label: 'Page de toutes les galeries.' },
				),
				gallerie: fields.object(
					{
						descriptions: fields.text({
							label: 'Description',
							description:
								'Les %title% seront remplacés par le titre de la galerie',
							validation: { isRequired: true },
						}),
					},
					{ label: 'Page galerie.' },
				),
			},
		}),
	},
})
