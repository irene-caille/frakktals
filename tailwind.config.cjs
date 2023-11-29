const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
const fs = require('node:fs')

const settings = JSON.parse(fs.readFileSync('src/content/settings/settings.json'))
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
				primary: colors[settings.primaryColor],
				links: colors[settings.linksColor],
				logo: colors[settings.logoColor]
			},

			fontFamily: {
				sans: ['Roboto', ...defaultTheme.fontFamily.sans],
				display: ['Chewy', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
}
