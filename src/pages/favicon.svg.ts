import type { APIRoute } from 'astro'
import settings from '../../settings.json'

export const GET: APIRoute = () => {
	return new Response(
		`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 16 16"><text x="0" y="14">${settings.favicon}</text></svg>`,
		{
			headers: {
				'Content-Type': 'image/svg+xml',
			},
		},
	)
}
