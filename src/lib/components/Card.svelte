<script lang="ts">
	type AlbumType = SpotifyApi.AlbumObjectFull | SpotifyApi.AlbumObjectSimplified;
	type PlaylistType = SpotifyApi.PlaylistObjectFull | SpotifyApi.PlaylistObjectSimplified;
	type ArtistType = SpotifyApi.ArtistObjectFull;

	export let item: AlbumType | PlaylistType | ArtistType;
</script>

<a class="card" href="/{item.type}/{item.id}" title={item.name}>
	{#if item.images.length > 0}
		<img
			loading="lazy"
			class="rounded-tl-container-token rounded-tr-container-token aspect-square"
			src={item.images[0].url}
			alt="{item.type} cover of {item.name}"
		/>
	{:else}
		<div class="w-full aspect-square flex items-center justify-center bg-surface-backdrop-token">
			<i class="fa-solid fa-music fa-2xl" />
		</div>
	{/if}
	<section class="p-4">
		<h2 class="h5 truncate">{item.name}</h2>
		{#if item.type === 'album'}
			<p class="truncate">{item.artists.map((item) => item.name).join(', ')}</p>
		{/if}
		{#if item.type === 'playlist'}
			<p class="line-clamp-2">{item.description}</p>
		{/if}
	</section>
</a>
