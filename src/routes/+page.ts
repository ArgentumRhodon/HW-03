import type { PageLoad } from './$types';
import { fetchRefresh } from '$helpers';

const numItems = 8;

export const load: PageLoad = async ({ fetch: _fetch, parent }) => {
	const { user } = await parent();

	const fetch = (path: string) => fetchRefresh(_fetch, path);

	const newReleases = fetch(`/api/spotify/browse/new-releases?limit=${numItems}`);
	const featuredPlaylists = fetch(`/api/spotify/browse/featured-playlists?limit=${numItems}`);
	const userPlaylists = fetch(`api/spotify/users/${user?.id}/playlists?limit=${numItems}`);

	// Await all promises simultaneously to avoid chaining promises
	const [newReleasesRes, featuredPlaylistsRes, userPlaylistsRes] = await Promise.all([
		newReleases,
		featuredPlaylists,
		userPlaylists
	]);

	// Returning them as individual components allows for the rest of the app to still function
	// if support for any given endpoint is terminated
	return {
		newReleases: newReleasesRes.ok
			? (newReleasesRes.json() as Promise<SpotifyApi.ListOfNewReleasesResponse>)
			: undefined,
		featuredPlaylists: featuredPlaylistsRes.ok
			? (featuredPlaylistsRes.json() as Promise<SpotifyApi.ListOfFeaturedPlaylistsResponse>)
			: undefined,
		userPlaylists: userPlaylistsRes.ok
			? (userPlaylistsRes.json() as Promise<SpotifyApi.ListOfUsersPlaylistsResponse>)
			: undefined
	};
};
