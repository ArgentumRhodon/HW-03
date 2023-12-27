<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import Filters from '$lib/components/Filters.svelte';
	import AppBar from '$lib/components/AppBar.svelte';
	import '../app.postcss';

	// Popup imports
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import type { LayoutData } from './$types';
	// Popup setup code
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	export let data: LayoutData;
</script>

<Filters />
<AppShell>
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
