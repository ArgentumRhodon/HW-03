<script lang="ts">
	import { AppBar, Avatar } from '@skeletonlabs/skeleton';
	import ThemeSelector from './ThemeSelector.svelte';
	import type { PageData } from '../../routes/$types';

	export let user: SpotifyApi.CurrentUsersProfileResponse | null;
</script>

<AppBar
	gridColumns="grid-cols-3"
	slotDefault="place-self-center"
	slotTrail="place-content-end"
	shadow="shadow-2xl"
>
	<svelte:fragment slot="lead">
		<nav>
			<!-- Spotify Vis temp logo -->
			<a href="/">
				<i class="fa-solid fa-eye fa-2xl mr-1" style="color: #1DB954" />
			</a>
		</nav>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<ThemeSelector />

		{#if user}
			<a
				class="flex items-center justify-center btn p-0"
				href={`https://open.spotify.com/user/${user.uri.split(':')[2]}`}
			>
				<Avatar
					src={user.images?.length ? user.images[1].url : '/pfp.svg'}
					width="w-12"
					rounded="rounded-token"
				/>
				<h2 class="hidden h2 text-2xl ml-2">{user.display_name}</h2>
			</a>
		{/if}
	</svelte:fragment>
</AppBar>
