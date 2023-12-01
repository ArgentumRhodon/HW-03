<script lang="ts">
	import {
		AppShell,
		BlueNight,
		Summer84,
		Emerald,
		NoirLight,
		XPro,
		Rustic,
		Apollo
	} from '@skeletonlabs/skeleton';
	import Snowfall from '$lib/components/Snowfall.svelte';
	import NewGroove from '$lib/components/NewGroove.svelte';
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

<BlueNight />
<Summer84 />
<Emerald />
<NoirLight />
<XPro />
<Rustic />
<Apollo />
<Snowfall />
<NewGroove />
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
