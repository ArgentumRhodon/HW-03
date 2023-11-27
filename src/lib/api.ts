import { requestToken } from './auth';

const makePostRequest = async (endpoint: string): Promise<any> => {
	const access_token = await requestToken();

	const result = await fetch('https://api.spotify.com/v1/' + endpoint, {
		method: 'POST',
		headers: { Authorization: `Bearer ${access_token}` }
	});

	return await result;
};

const addToQueue = async (uri: string): Promise<SpotifyApi.AddToQueueResponse> => {
	return makePostRequest(`me/player/queue?uri=${uri}`);
};

const skipToNext = async () => {
	return makePostRequest('me/player/next');
};

const playTrack = async (uri: string) => {
	addToQueue(uri).then(skipToNext);
};

const makeGetRequest = async (endpoint: string): Promise<any> => {
	const access_token = await requestToken();

	const result = await fetch('https://api.spotify.com/v1/' + endpoint, {
		method: 'GET',
		headers: { Authorization: `Bearer ${access_token}` }
	});

	return await result.json();
};

const getUserProfile = async (): Promise<SpotifyApi.UserObjectPublic> => {
	return makeGetRequest('me');
};

const getTopTracks = async (): Promise<SpotifyApi.UsersTopTracksResponse> => {
	return makeGetRequest('me/top/tracks');
};

export { playTrack, getUserProfile, getTopTracks };
