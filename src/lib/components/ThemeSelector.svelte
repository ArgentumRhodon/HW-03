<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { storeTheme } from '$lib/stores/stores';
	import {
		LightSwitch,
		ListBox,
		ListBoxItem,
		popup,
		type PopupSettings
	} from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';

	// settings for a popup
	const popupThemeSelect: PopupSettings = {
		event: 'click',
		target: 'popupThemeSelect',
		placement: 'bottom'
	};

	// Skeleton themes that the app supports
	const themes = [
		{ type: 'skeleton', name: 'Skeleton', icon: '💀' },
		{ type: 'wintry', name: 'Wintry', icon: '🌨️' },
		{ type: 'modern', name: 'Modern', icon: '🤖' },
		{ type: 'rocket', name: 'Rocket', icon: '🚀' },
		{ type: 'seafoam', name: 'Seafoam', icon: '🧜‍♀️' },
		{ type: 'vintage', name: 'Vintage', icon: '📺' },
		{ type: 'sahara', name: 'Sahara', icon: '🏜️' },
		{ type: 'hamlindigo', name: 'Hamlindigo', icon: '👔' },
		{ type: 'gold-nouveau', name: 'Gold Nouveau', icon: '💫' },
		{ type: 'crimson', name: 'Crimson', icon: '⭕' }
		// { type: 'seasonal', name: 'Seasonal', icon: '🎆' }
		// { type: 'test', name: 'Test', icon: '🚧' },
	];

	const setTheme: SubmitFunction = ({ formData }) => {
		const theme = formData.get('theme')?.toString();

		if (theme) {
			document.body.setAttribute('data-theme', theme);
			$storeTheme = theme;
		}
	};
</script>

<!-- Parent div needed for positioning magic -->
<div>
	<!-- Trigger -->
	<button
		class="btn hover:variant-soft-primary"
		use:popup={{ event: 'click', target: 'theme', closeQuery: 'a[href]' }}
	>
		<span class="capitalize">{$storeTheme ?? 'Theme'}</span>
		<i class="fa-solid fa-caret-down" />
	</button>

	<!-- Popup -->
	<div class="card w-48 shadow-xl p-4 space-y-4" data-popup="theme">
		<div class="flex items-center justify-between">
			<span>Mode</span>
			<!-- Adds support for changing between light and dark mode -->
			<LightSwitch />
		</div>
		<hr />
		<form action="/?/setTheme" method="POST" use:enhance={setTheme}>
			<ul class="space-y-1">
				{#each themes as { icon, name, type }}
					<li>
						<button
							class="btn variant-soft-primary w-full h-full"
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
		<div class="arrow bg-surface-100-800-token" />
	</div>
</div>
