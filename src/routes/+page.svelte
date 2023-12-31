<script lang="ts">
	import type { PageData } from './$types';

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

<svelte:head>
	<title>SpotifyDash</title>
</svelte:head>

<div class="space-y-4">
	{#each sections as section}
		<section>
			<h1 class="h3 mb-2">{section.title}</h1>
			<div class="grid grid-cols-8 gap-4">
				{#each section.items as item}
					<a class="card" href="">
						<img
							class="rounded-tl-container-token rounded-tr-container-token"
							src={item.images[0].url}
							alt=""
						/>
						<section class="p-4">
							<h2 class="h5">{item.name}</h2>
						</section>
					</a>
				{/each}
			</div>
		</section>
	{/each}
</div>
