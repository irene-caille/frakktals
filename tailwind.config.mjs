const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
const fs = require('node:fs')

const settings = JSON.parse(fs.readFileSync('settings.json'))
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: colors[settings.primaryColor],
				links: colors[settings.linksColor],
				logo: colors[settings.logoColor],
			},
			fontFamily: {
				display: ['Chewy', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
