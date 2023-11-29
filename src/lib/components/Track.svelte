<script lang="ts">
	// import { playTrack } from '$lib/api';

	export let track: SpotifyApi.TrackObjectFull;
</script>

<button
	class="flex items-center justify-start variant-glass-secondary btn p-0 w-full"
	on:click={() => {
		// playTrack(track.uri);
	}}
>
	<img src={track.album.images[0].url} alt="" class="w-12 rounded-token" />
	<span class="truncate">{track.name}</span>
</button>
