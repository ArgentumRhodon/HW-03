<script lang="ts">
	import { AppBar, Avatar, filter, type PopupSettings } from '@skeletonlabs/skeleton';
	export let user: SpotifyApi.CurrentUsersProfileResponse | null;
	import { enhance } from '$app/forms';
	import { storeTheme } from '$lib/stores/stores';
	import { LightSwitch, popup } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { invalidateAll } from '$app/navigation';

	// Skeleton themes that the app supports
	const themes = [
		{ type: 'skeleton', icon: '💀', filter: '#SkeleTime' },
		{ type: 'wintry', icon: '🌨️', filter: '#Snowfall' },
		{ type: 'modern', icon: '🤖', filter: '#BlueNight' },
		{ type: 'rocket', icon: '🚀', filter: '#RocketMan' },
		{ type: 'seafoam', icon: '🧜‍♀️', filter: '#Emerald' },
		{ type: 'vintage', icon: '📺', filter: '#Rustic' },
		{ type: 'sahara', icon: '🏜️', filter: '#XPro' },
		{ type: 'hamlindigo', icon: '👔', filter: '#NoirLight' },
		{ type: 'gold-nouveau', icon: '💫', filter: '#NewGroove' },
		{ type: 'crimson', icon: '⭕', filter: '#Summer84' }
	];

	const setTheme: SubmitFunction = ({ formData }) => {
		const theme = formData.get('theme')?.toString();

		if (theme) {
			document.body.setAttribute('data-theme', theme);
			$storeTheme = theme;
		}
	};

	const popupTheme: PopupSettings = {
		event: 'click',
		target: 'theme',
		closeQuery: 'a[href]',
		placement: 'bottom-end',
		middleware: { offset: 24 }
	};

	const popupProfile: PopupSettings = {
		event: 'click',
		target: 'profile',
		closeQuery: 'a[href]',
		placement: 'bottom-end',
		middleware: { offset: 32 }
	};

	// Reactive variables
	$: pfpFilter = themes.find((theme) => theme.type === $storeTheme)?.filter;
</script>

<AppBar gridColumns="grid-cols-2" slotTrail="place-content-end" shadow="shadow-2xl">
	<!-- [Spotify Vis Logo] -->

	<svelte:fragment slot="trail">
		<div>
			<!-- Trigger -->
			<button class="btn hover:variant-soft-primary" use:popup={popupTheme}>
				<span class="capitalize">Theme</span>
				<i class="fa-solid fa-caret-down" />
			</button>

			<!-- Popup -->
			<div class="popup-container" data-popup="theme">
				<div class="flex items-center justify-between">
					<h6 class="h6">Mode</h6>
					<!-- Adds support for changing between light and dark mode -->
					<LightSwitch />
				</div>
				<hr />
				<form
					class="max-h-64 lg:max-h-[500px] overflow-y-auto"
					action="/?/setTheme"
					method="POST"
					use:enhance={setTheme}
				>
					<ul class="space-y-1 list-nav">
						{#each themes as { type, icon }}
							<li>
								<button
									class="w-full h-full"
									type="submit"
									name="theme"
									value={type}
									class:bg-primary-active-token={$storeTheme === type}
								>
									<span>{icon}</span>
									<span class="flex-auto text-left capitalize">{type}</span>
								</button>
							</li>
						{/each}
					</ul>
				</form>
			</div>
		</div>

		{#if user}
			<div>
				<!-- Trigger -->
				<button class="btn p-0" use:popup={popupProfile}>
					<Avatar
						src={user.images?.length ? user.images[1].url : '/pfp.svg'}
						width="w-8"
						rounded="rounded-token"
						action={filter}
						actionParams={pfpFilter}
					/>
					<i class="fa-solid fa-caret-down" />
				</button>

				<!-- Popup -->
				<nav class="popup-container" data-popup="profile">
					<a class="btn variant-filled-primary flex justify-between" href={user.uri}>
						Open Spotify
						<i class="fa-solid fa-arrow-up-right-from-square" />
					</a>
					<hr />
					<!-- Logout Button | Works with and without JS -->
					<form
						method="POST"
						action="/api/auth/logout"
						on:submit|preventDefault={async () => {
							const response = await fetch('/api/auth/logout', {
								method: 'POST',
								headers: {
									accept: 'application/json'
								}
							});
							if (response.ok) {
								invalidateAll();
							}
						}}
					>
						<button type="submit" class="btn variant-filled-error w-full flex justify-between">
							Log out
							<i class="fa-solid fa-arrow-right-from-bracket" />
						</button>
					</form>
				</nav>
			</div>
		{/if}
	</svelte:fragment>
</AppBar>

<style>
	.popup-container {
		@apply card w-60 shadow-xl p-4 space-y-4;
	}
</style>
