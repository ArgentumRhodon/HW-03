import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, cookies, params, url }) => {
	const access_token = cookies.get('access_token');

	const response = await fetch(`https://api.spotify.com/v1/${params.path}${url.search}`, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});

	const responseJSON = await response.json();
	if (responseJSON.error) {
		throw error(responseJSON.error.status, responseJSON.error.message);
	}

	return json(responseJSON);
};
