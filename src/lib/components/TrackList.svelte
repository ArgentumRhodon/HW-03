<script lang="ts">
	import msToTime from '$helpers/ms-to-time';
	import EqualAnim from './EqualAnim.svelte';
	import Player from './Player.svelte';

	let currentlyPlaying: string | null = null;
	let isPaused = false;

	export let tracks: SpotifyApi.TrackObjectFull[] | SpotifyApi.TrackObjectSimplified[];
</script>

<div class="hidden sm:grid grid-cols-[48px_1fr_48px]">
	<p class="mx-4">#</p>
	<p class="w-full">Title</p>
	<p class="mx-4"><i class="fa-regular fa-clock" /></p>
</div>
<hr class="my-2" />
{#each tracks as track, index}
	<div
		class="grid grid-cols-1 sm:grid-cols-[48px_1fr_48px] items-center hover:bg-surface-500/25 rounded-container-token group p-4 relative"
		class:is-current={currentlyPlaying === track.id}
	>
		<div class="w-12 flex justify-center">
			{#if currentlyPlaying === track.id && !isPaused}
				<EqualAnim />
			{:else}
				<p class="group-hover:hidden current-primary">
					{index + 1}
				</p>
			{/if}
			<Player
				{track}
				on:play={(e) => {
					currentlyPlaying = e.detail.track.id;
					isPaused = false;
				}}
				on:pause={(e) => {
					isPaused = e.detail.track.id === currentlyPlaying;
				}}
			/>
		</div>
		<div class="w-full">
			<p class="font-semibold current-primary">{track.name}</p>
			<p class="text-sm text-gray-500 dark:text-gray-400 current-white">
				{track.artists.map((artist) => artist.name).join(', ')}
			</p>
		</div>
		<p class="hidden sm:block">{msToTime(track.duration_ms)}</p>
	</div>
{/each}

<style>
	.is-current {
		@apply bg-surface-500/25;
	}
	.is-current .current-primary {
		@apply text-primary-500;
	}
	.is-current .current-white {
		@apply text-white;
	}
</style>
