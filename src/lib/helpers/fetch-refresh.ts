import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';

export default async function fetchRefresh(
	fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>,
	path: string
) {
	const request = fetch(path);

	// No need to do the rest if function is running on the server
	if (!browser) return request;

	const response = await request;
	// If the response returns as unauthorized, refresh token and try again
	if (response.status === 401) {
		// If a refresh promise exists in the window, that means some other fetch
		// already failed due to an invalid access code and we can wait for that
		// token refresh instead.
		if (!window.refreshPromise) {
			// Store refresh promise globally in the window
			window.refreshPromise = fetch('/api/auth/refresh').finally(() => {
				window.refreshPromise = null;
			});
		}
		const refreshResponse = await window.refreshPromise;
		// If unable to refresh authorization token, throw error
		if (!refreshResponse.ok) {
			throw error(401, 'Session Expired');
		}

		return fetch(path);
	} else {
		return response;
	}
}
