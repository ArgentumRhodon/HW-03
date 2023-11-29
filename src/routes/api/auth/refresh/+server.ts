import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const client_id: string = '8b1d3899524e4680b809acc792c5a349';

export const GET: RequestHandler = async ({ cookies, fetch }) => {
	const refresh_token = cookies.get('refresh_token');

	// Sends a token refresh request to spotify
	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: refresh_token || '',
			client_id
		})
	});

	// If the refresh fails, delete all cookies and throw an error
	const responseJSON = await response.json();
	if (responseJSON.error) {
		cookies.delete('refresh_token', { path: '/' });
		cookies.delete('access_token', { path: '/' });

		throw error(401, responseJSON.error_description);
	}

	// Else, update cookies and return the response json
	cookies.set('refresh_token', responseJSON.refresh_token, { path: '/' });
	cookies.set('access_token', responseJSON.access_token, { path: '/' });

	return json(responseJSON);
};
