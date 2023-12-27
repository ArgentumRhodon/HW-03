import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies, request }) => {
	// Log out by:

	// Deleting cookies
	cookies.delete('refresh_token', { path: '/' });
	cookies.delete('access_token', { path: '/' });

	// If using Javascript, simply return success
	if (request.headers.get('accept') === 'application/json') {
		return json({ success: true });
	} else {
		// If not, throw a redirect to the login page
		throw redirect(303, '/login');
	}
};
