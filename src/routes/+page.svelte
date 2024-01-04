<script lang="ts">
	import type { PageData } from './$types';
	import Card from '$lib/components/Card.svelte';

	export let data: PageData;

	interface Section {
		title: string;
		path: string;
		items: (SpotifyApi.AlbumObjectSimplified | SpotifyApi.PlaylistObjectSimplified)[];
	}

	let sections: Section[] = [];
	$: {
		if (data.userPlaylists) {
			sections.push({
				title: 'Your Playlists',
				path: '/playlists',
				items: data.userPlaylists.items
			});
		}
		if (data.newReleases) {
			sections.push({
				title: 'New Releases',
				path: '/sections/new-releases',
				items: data.newReleases.albums.items
			});
		}
		if (data.featuredPlaylists) {
			sections.push({
				title: 'Featured Playlists',
				path: '/sections/featured-playlists',
				items: data.featuredPlaylists.playlists.items
			});
		}
	}
</script>

<div class="space-y-4">
	{#each sections as section}
		<section>
			<h1 class="h3 mb-2">{section.title}</h1>
			<div class="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-8 gap-4">
				{#each section.items as item}
					<Card {item} />
				{/each}
			</div>
		</section>
	{/each}
</div>
