import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, fetch, url }) => {
	const access_token = cookies.get('access_token');
	const refresh_token = cookies.get('refresh_token');

	// If not logged in, return empty user
	if (!access_token) {
		return {
			user: null
		};
	}

	// Else, look for a profile
	const profileRes = await fetch('https://api.spotify.com/v1/me', {
		method: 'GET',
		headers: { Authorization: `Bearer ${access_token}` }
	});

	// If the profile exists, return a populated user object
	if (profileRes.ok) {
		const profile: SpotifyApi.CurrentUsersProfileResponse = await profileRes.json();
		return {
			user: profile
		};
	} else if (profileRes.status === 401 && refresh_token) {
		// If the user isn't logged in, try refreshing the token and try again
		const refreshResponse = await fetch('/api/auth/refresh');
		if (refreshResponse.ok) {
			throw redirect(307, url.pathname);
		} else {
			// If an error occurs during refreshing, such as an invalid refresh
			// token, return an empty user
			return {
				user: null
			};
		}
	} else {
		// If bad access token and no refresh token, return empty user
		return {
			user: null
		};
	}
};
