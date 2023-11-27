import type { ModalSettings, ModalStore } from '@skeletonlabs/skeleton';
import { writable } from 'svelte/store';
import { getTopTracks, getUserProfile } from './api';
const clientId = '8b1d3899524e4680b809acc792c5a349';
let code: string | null;

interface SpotifyVisUser {
	display_name: string;
	images: SpotifyApi.ImageObject[];
	topTracks: SpotifyApi.TrackObjectFull[];
	spotifyURL: string;
}
const user = writable<SpotifyVisUser | null>(null);

const redirectToAuthCodeFlow = async () => {
	const verifier = generateCodeVerifier(128);
	const challenge = await generateCodeChallenge(verifier);

	localStorage.setItem('verifier', verifier);

	const params = new URLSearchParams();
	params.append('client_id', clientId);
	params.append('response_type', 'code');
	params.append('redirect_uri', 'http://localhost:5173');
	params.append(
		'scope',
		'user-read-private user-read-email user-top-read user-modify-playback-state'
	);
	params.append('code_challenge_method', 'S256');
	params.append('code_challenge', challenge);

	document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
};

const generateCodeVerifier = (length: number) => {
	let text = '';
	let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

const generateCodeChallenge = async (codeVerifier: string) => {
	const data = new TextEncoder().encode(codeVerifier);
	const digest = await window.crypto.subtle.digest('SHA-256', data);
	return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');
};

const getAccessToken = async (code: string): Promise<string> => {
	const verifier = localStorage.getItem('verifier');

	const params = new URLSearchParams();
	params.append('client_id', clientId);
	params.append('grant_type', 'authorization_code');
	params.append('code', code);
	params.append('redirect_uri', 'http://localhost:5173');
	params.append('code_verifier', verifier!);

	const result = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: params
	});

	const { access_token } = await result.json();

	localStorage.setItem('access_token', access_token);

	return access_token;
};

// Updates user information
const updateUser = async () => {
	const userProfile: SpotifyApi.UserObjectPublic = await getUserProfile();
	const topTracksResponse: SpotifyApi.UsersTopTracksResponse = await getTopTracks();
	const topTracks: SpotifyApi.TrackObjectFull[] = topTracksResponse.items;

	user.set({
		display_name: userProfile.display_name ?? 'Spotify User',
		images: userProfile.images ?? [{ url: '/unknown-user.png' }],
		topTracks: topTracks,
		spotifyURL: userProfile.uri
	});
};

// CURRENTLY DOESN'T ACCOUNT FOR INVALID TOKENS
// Checks if there's a stored access token
// If token: return it
// If no token: generate and return one
const requestToken = async () => {
	const tokenExists = localStorage.hasOwnProperty('access_token');
	return tokenExists ? localStorage.getItem('access_token') : await getAccessToken(code!);
};

const init = async (modal: ModalSettings, modalStore: ModalStore) => {
	const params = new URLSearchParams(window.location.search);
	code = params.get('code');

	if (!code) {
		new Promise<boolean>((resolve) => {
			modal.response = (r: boolean) => resolve(r);
			modalStore.trigger(modal);
		}).then((r: any) => {
			if (r) {
				redirectToAuthCodeFlow();
			} else {
				console.warn('No Spotify log in');
			}
		});
	} else {
		// Initializes the access token (or retrieves it) upon loading
		// with a code in the URL
		updateUser();
	}
};

export { init, user, requestToken };
