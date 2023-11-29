<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import { Navbar } from '$lib';
	import '../app.postcss';
	// Popup imports
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import type { LayoutData } from './$types';
	import LogoutButton from '$lib/components/LogoutButton.svelte';
	// Popup setup code
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	export let data: LayoutData;
</script>

<AppShell>
	<svelte:fragment slot="header">
		<Navbar user={data.user} />
	</svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	{#if data.user}
		<LogoutButton />
	{/if}
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>
