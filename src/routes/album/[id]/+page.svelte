<script lang="ts">
	import getCopyrightText from '$helpers/copyright-symbol';
	import type { PageData } from './$types';

	export let data: PageData;

	$: album = data.album;
</script>

<h2 class="h5">{album.type}</h2>
<h1 class="h2">{album.name}</h1>

<div class="my-4">
	<ul>
		{#each album.tracks.items as track}
			<li>*{track.name}</li>
		{/each}
	</ul>
</div>

<div>
	<p>
		{new Date(album.release_date).toLocaleDateString('en', {
			dateStyle: 'medium'
		})}
	</p>
	{#each album.copyrights as copyright}
		<p>{getCopyrightText(copyright.text)}</p>
	{/each}
</div>
