<script lang="ts">
	import getCopyrightText from '$helpers/copyright-symbol';
	import msToTime from '$helpers/ms-to-time';
	import ItemPage from '$lib/components/ItemPage.svelte';
	import Tracklist from '$lib/components/TrackList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: album = data.album;
	$: dateFormatted = new Date(album.release_date).toLocaleDateString('en', { dateStyle: 'medium' });
	$: albumLength = msToTime(
		album.tracks.items.map((item) => item.duration_ms).reduce((a, b) => a + b)
	);
</script>

<ItemPage
	imageURL={album.images[0] ? album.images[0].url : undefined}
	name={album.name}
	type={album.album_type}
>
	<p slot="meta">
		<span
			>{@html album.artists
				.map((artist) => `<a class="hover:underline" href=${artist.uri}>${artist.name}</a>`)
				.join(' • ')}</span
		>
		<span> • </span>
		<span title={dateFormatted}>{new Date(album.release_date).getFullYear()}</span>
		<span> • </span>
		<span>{`${album.total_tracks} Song${album.total_tracks > 1 ? 's' : ''},`}</span>
		<span>{albumLength}</span>
	</p>

	<Tracklist tracks={album.tracks.items} />

	<hr class="my-2" />

	<div class="text-sm text-gray-500 dark:text-gray-400">
		<p>
			{dateFormatted}
		</p>
		{#each album.copyrights as copyright}
			<p>{getCopyrightText(copyright.text)}</p>
		{/each}
	</div>
</ItemPage>
