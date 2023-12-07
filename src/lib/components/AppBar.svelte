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
		{ type: 'skeleton', name: 'Skeleton', icon: '💀', filter: '#SkeleTime' },
		{ type: 'wintry', name: 'Wintry', icon: '🌨️', filter: '#Snowfall' },
		{ type: 'modern', name: 'Modern', icon: '🤖', filter: '#BlueNight' },
		{ type: 'rocket', name: 'Rocket', icon: '🚀', filter: '#RocketMan' },
		{ type: 'seafoam', name: 'Seafoam', icon: '🧜‍♀️', filter: '#Emerald' },
		{ type: 'vintage', name: 'Vintage', icon: '📺', filter: '#Rustic' },
		{ type: 'sahara', name: 'Sahara', icon: '🏜️', filter: '#XPro' },
		{ type: 'hamlindigo', name: 'Hamlindigo', icon: '👔', filter: '#NoirLight' },
		{ type: 'gold-nouveau', name: 'Gold Nouveau', icon: '💫', filter: '#NewGroove' },
		{ type: 'crimson', name: 'Crimson', icon: '⭕', filter: '#Summer84' }
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
				<span class="capitalize">{$storeTheme}</span>
				<i class="fa-solid fa-caret-down" />
			</button>

			<!-- Popup -->
			<div class="card w-60 shadow-xl p-4 space-y-4" data-popup="theme">
				<div class="flex items-center justify-between">
					<h6 class="h6">Mode</h6>
					<!-- Adds support for changing between light and dark mode -->
					<LightSwitch />
				</div>
				<hr />
				<nav class="list-nav px-4 -mx-4 max-h-64 lg:max-h-[500px] overflow-y-auto">
					<form action="/?/setTheme" method="POST" use:enhance={setTheme}>
						<ul class="space-y-1">
							{#each themes as { icon, name, type }}
								<li>
									<button
										class="w-full h-full"
										type="submit"
										name="theme"
										value={type}
										class:bg-primary-active-token={$storeTheme === type}
									>
										<span>{icon}</span>
										<span class="flex-auto text-left">{name}</span>
									</button>
								</li>
							{/each}
						</ul>
					</form>
				</nav>
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
				<div class="card w-60 shadow-xl p-4" data-popup="profile">
					<nav class="list-nav px-4 -mx-4 space-y-4">
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
								Logout
								<i class="fa-solid fa-arrow-right-from-bracket" />
							</button>
						</form>
					</nav>
				</div>
			</div>
		{/if}
	</svelte:fragment>
</AppBar>
