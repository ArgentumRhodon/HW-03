<script lang="ts">
	import { page } from '$app/stores';
	import { AppShell } from '@skeletonlabs/skeleton';
	import Filters from '$lib/components/Filters.svelte';
	import AppBar from '$lib/components/AppBar.svelte';
	import '../app.postcss';

	// Progress bar at the top of page
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	NProgress.configure({ showSpinner: false });

	// Popup imports
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import type { LayoutData } from './$types';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	// Popup setup code
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	export let data: LayoutData;

	afterNavigate(() => NProgress.done());
	beforeNavigate(() => NProgress.start());
</script>

<!-- Page title are dynamically filled in by the root layout -->
<!-- Titles are returned as data from +page.ts files -->
<svelte:head>
	<title>SpotifyDash{$page.data.title ? ` -  ${$page.data.title}` : ''}</title>
</svelte:head>

<Filters />
<AppShell slotPageContent="p-4">
	<svelte:fragment slot="header">
		<AppBar user={data.user} />
	</svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>
