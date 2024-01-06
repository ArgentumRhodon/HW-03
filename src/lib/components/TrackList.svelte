<script lang="ts">
	import msToTime from '$helpers/ms-to-time';

	export let tracks: SpotifyApi.TrackObjectFull[] | SpotifyApi.TrackObjectSimplified[];

	let focusedButtonIndex: number | undefined = undefined;
</script>

<div class="hidden sm:grid grid-cols-[48px_1fr_48px]">
	<p class="mx-4">#</p>
	<p class="w-full">Title</p>
	<p class="mx-4"><i class="fa-regular fa-clock" /></p>
</div>
<hr class="my-2" />
{#each tracks as track, index}
	<div
		class="grid grid-cols-1 sm:grid-cols-[48px_1fr_48px] items-center hover:bg-surface-500/25 rounded-container-token group p-4 relative
		{focusedButtonIndex === index ? 'bg-surface-500/25' : ''}"
	>
		<div class="w-12 flex justify-center">
			<p
				class="hidden group-hover:hidden"
				class:sm:hidden={focusedButtonIndex === index}
				class:sm:block={focusedButtonIndex !== index}
			>
				{index + 1}
			</p>
			<button
				on:focus={() => (focusedButtonIndex = index)}
				on:blur={() => (focusedButtonIndex = undefined)}
				on:click={() => console.log('clicked')}
				class="after:content-[''] after:rounded-container-token after:absolute after:top-0 after:right-0 after:left-0 after:bottom-0 focus-visible:outline-none"
			>
				<i
					class="fa-solid fa-play hidden sm:group-hover:block"
					class:sm:block={focusedButtonIndex === index}
					class:sm:hidden={focusedButtonIndex !== index}
				/>
			</button>
		</div>
		<div class="w-full">
			<p class="font-semibold">{track.name}</p>
			<p class="text-sm text-gray-500 dark:text-gray-400">
				{track.artists.map((artist) => artist.name).join(', ')}
			</p>
		</div>
		<p class="hidden sm:block">{msToTime(track.duration_ms)}</p>
	</div>
{/each}
