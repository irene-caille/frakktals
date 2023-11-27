const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			height: {
				screen: ['100vh', '100dvh']
			},
			minHeight: {
				screen: ['100vh', '100dvh']
			},
			colors: {
				fluo: '#FFFF00'
			},

			fontFamily: {
				sans: ['Roboto', ...defaultTheme.fontFamily.sans],
				display: ['Chewy', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
}
