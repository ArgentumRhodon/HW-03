import { error, redirect, type RequestHandler } from '@sveltejs/kit';

const client_id: string = '8b1d3899524e4680b809acc792c5a349';

// This callback endpoint is responsible for catching all of the data returned
// by Spotify's redirect, deleting verification cookies, and creating/updating
// authentication cookies
export const GET: RequestHandler = async ({ url, cookies, fetch }) => {
	// Get the code and state returned by Spotify
	const code = url.searchParams.get('code') || null;
	const state = url.searchParams.get('state') || null;

	// Remember the stored verification cookies
	const storedState = cookies.get('spotify_auth_state') || null;
	const storedChallengeVerifier = cookies.get('spotify_auth_challenge_verifier') || null;

	// If no/invalid state, throw error and disallow further authentication
	if (state === null || state !== storedState) {
		throw error(400, 'State Mismatch');
	}

	// Request an authentication token from Spotify given the locally stored
	// verification info and the info returned by Spotify's redirect
	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			client_id,
			grant_type: 'authorization_code',
			code: code || '',
			redirect_uri: 'http://localhost:5173/api/auth/callback',
			code_verifier: storedChallengeVerifier || ''
		})
	});

	const responseJSON = await response.json();

	if (responseJSON.error) {
		throw error(400, responseJSON.error_description);
	}

	// Delete verification cookies
	cookies.delete('spotify_auth_state');
	cookies.delete('spotify_auth_challenge_verifier');
	// Set authentication cookies
	cookies.set('refresh_token', responseJSON.refresh_token, { path: '/' });
	cookies.set('access_token', responseJSON.access_token, { path: '/' });

	// Redirect to the home page
	throw redirect(303, '/');
};
