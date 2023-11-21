<script lang="ts">
	import { Track } from '$lib';
	import { user } from '$lib/auth';
</script>

<div class="h-96 2xl:h-[36rem] overflow-scroll">
	<ul class="p-4 space-y-2">
		{#if $user}
			{#each $user.topTracks as track}
				<Track {track} />
			{/each}
		{/if}
	</ul>
</div>
