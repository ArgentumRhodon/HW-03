import { redirect, type RequestHandler } from '@sveltejs/kit';
import pkce from 'pkce-gen';

const client_id: string = '8b1d3899524e4680b809acc792c5a349';
// Initialize scope as a joined array of strings for ease of development,
// eventually turning into a single string
const scope: string = [
	'user-read-private',
	'user-read-email',
	'user-top-read',
	'user-modify-playback-state'
].join(' ');

// A random string method used to generate a state argument for increased auth
// security
const generateRandomString = (length: number): string => {
	let text = '';
	let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

const state: string = generateRandomString(16);
const challenge = pkce.create();

export const GET: RequestHandler = async ({ cookies }) => {
	// Set verification cookies
	cookies.set('spotify_auth_state', state, {expires: new Date('9999-12-31T23:59:59')});
	cookies.set('spotify_auth_challenge_verifier', challenge.code_verifier, {expires: new Date('9999-12-31T23:59:59')});

	throw redirect(
		307,
		`https://accounts.spotify.com/authorize?${new URLSearchParams({
			response_type: 'code',
			client_id,
			scope,
			redirect_uri: 'http://localhost:5173/api/auth/callback',
			state,
			code_challenge_method: 'S256',
			code_challenge: challenge.code_challenge
		})}`
	);
};
