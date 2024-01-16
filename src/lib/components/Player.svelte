<script lang="ts" context="module">
	let current: HTMLAudioElement;
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	type Track = SpotifyApi.TrackObjectSimplified | SpotifyApi.TrackObjectFull;
	export let track: Track;

	const dispatch = createEventDispatcher<{
		play: { track: Track };
		pause: { track: Track };
	}>();

	let audio: HTMLAudioElement;
	let paused = true;

	const onPlay = () => {
		if (current && current !== audio) {
			current.currentTime = 0;
			current.pause();
		}
		current = audio;
		dispatch('play', { track });
	};
	const onPause = () => {
		dispatch('pause', { track });
	};
</script>

<div>
	<audio
		bind:this={audio}
		bind:paused
		on:play={onPlay}
		on:pause={onPause}
		controls
		src={track.preview_url}
		preload="none"
		class="hidden"
	/>
	<button
		aria-label={paused ? `Play ${track.name}` : `Pause ${track.name}`}
		on:click={(e) => {
			// Prevents sticky higlighting when playing a song
			if (paused) {
				audio.play();
			} else {
				audio.pause();
			}
		}}
		class="after:content-[''] after:rounded-container-token after:absolute after:top-0 after:right-0 after:left-0 after:bottom-0 focus-visible:outline-none"
	>
		{#if paused}
			<i class="fa-solid fa-play hidden sm:group-hover:block" />
		{:else}
			<i class="fa-solid fa-pause hidden sm:group-hover:block" />
		{/if}
	</button>
</div>
