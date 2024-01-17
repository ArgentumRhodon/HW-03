import { fetchRefresh } from '$helpers';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const playlistResponse = await fetchRefresh(fetch, `/api/spotify/playlists/${params.id}`);

	if (!playlistResponse.ok) {
		throw error(playlistResponse.status, 'Failed to load playlist');
	}

	const playlistJSON: SpotifyApi.SinglePlaylistResponse = await playlistResponse.json();

	return {
		title: playlistJSON.name,
		playlist: playlistJSON
	};
}) satisfies PageLoad;
