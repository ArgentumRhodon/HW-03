import { fetchRefresh } from '$helpers';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	// Fetch data
	const albumResponse = await fetchRefresh(fetch, `/api/spotify/albums/${params.id}`);

	// Handle errors
	if (!albumResponse.ok) {
		throw error(albumResponse.status, 'Failed to load album');
	}

	// Extract JSON
	const albumJSON: SpotifyApi.SingleAlbumResponse = await albumResponse.json();

	// Return data
	return {
		title: albumJSON.name,
		album: albumJSON
	};
}) satisfies PageLoad;
