<script lang="ts">
	import {
		AppBar,
		ListBox,
		ListBoxItem,
		popup,
		LightSwitch,
		Avatar,
		type PopupSettings
	} from '@skeletonlabs/skeleton';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { user } from '$lib/auth';

	// default page theme
	let currentTheme: string = 'skeleton';

	// settings for a popup
	const popupThemeSelect: PopupSettings = {
		event: 'click',
		target: 'popupThemeSelect',
		placement: 'bottom'
	};

	// Skeleton themes that the app supports
	const supportedThemes: string[] = [
		'skeleton',
		'wintry',
		'modern',
		'hamlindigo',
		'rocket',
		'sahara',
		'gold-nouveau',
		'vintage',
		'seafoam',
		'crimson'
	];

	// Returns a string with the first letter capitalized
	const capitalize = (s: string) => {
		return s[0].toUpperCase() + s.slice(1);
	};

	// Updates the locally stored theme to the current theme
	const updateTheme = () => localStorage.setItem('lac2559-theme', currentTheme);

	// This reactively declared if statement runs every time "currentTheme" changes, but
	// only when the browser exists
	$: if (browser) {
		document.body.dataset.theme = currentTheme;
	}

	// This fetched the current theme settings in local storage, if any, and is only run
	// when the component is "mounted" to the DOM
	onMount(() => (currentTheme = localStorage.getItem('lac2559-theme') || 'skeleton'));
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
		<!-- Theme select popup card - Needs to be before the toggle element -->
		<div class="card w-48 shadow-xl p-4 space-y-4" data-popup="popupThemeSelect">
			<div class="flex items-center justify-between">
				<span>Mode</span>
				<!-- Adds support for changing between light and dark mode -->
				<LightSwitch />
			</div>
			<hr />
			<ListBox>
				<!-- Creates a ListBoxItem for each theme, similar to how map() is used in React -->
				{#each supportedThemes as theme}
					<ListBoxItem bind:group={currentTheme} name="theme" value={theme} on:change={updateTheme}>
						{capitalize(theme)}
					</ListBoxItem>
				{/each}
			</ListBox>
			<div class="arrow bg-surface-100-800-token" />
		</div>

		<!-- This element triggers the theme select popup card -->
		<button class="btn hover:variant-soft-primary" use:popup={popupThemeSelect}>
			<span class="capitalize">{currentTheme ?? 'Theme'}</span>
			<i class="fa-solid fa-caret-down" />
		</button>

		<nav>
			<a href="/about">About</a>
		</nav>
		<a class="flex items-center justify-center btn p-0" href={$user?.spotifyURL}>
			<Avatar src={$user?.images[1].url} width="w-12" rounded="rounded-token" />
			<h2 class="hidden h2 text-2xl ml-2">{$user?.display_name}</h2>
		</a>
	</svelte:fragment>
</AppBar>
