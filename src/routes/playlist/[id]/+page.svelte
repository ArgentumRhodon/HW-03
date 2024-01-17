<script lang="ts">
	import ItemPage from '$lib/components/ItemPage.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: playlist = data.playlist;
</script>

<ItemPage
	imageURL={playlist.images[0] ? playlist.images[0].url : undefined}
	name={playlist.name}
	type={playlist.type}
>
	<p slot="meta">
		<span>{playlist.description}</span>
		<span>{playlist.collaborative}</span>
	</p>
</ItemPage>
