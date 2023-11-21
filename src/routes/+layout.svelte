<script lang="ts">
	import {
		AppShell,
		storePopup,
		initializeStores,
		Modal,
		getModalStore,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import { Navbar, auth } from '$lib';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { onMount } from 'svelte';
	import '../app.postcss';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	initializeStores();

	// Initialize the modal store and information
	const modalStore = getModalStore();
	const modal: ModalSettings = {
		type: 'confirm',
		// Data
		title: 'Spotify Required',
		body: 'In order to use this application, you must sign in to Spotify. Do you wish to proceed?',
		buttonTextConfirm: 'Yes, Sign in',
		buttonTextCancel: 'No'
		// response: (r: boolean) => resolve(r)
	};

	onMount(() => {
		// Pass the modal info to the auth code
		auth.init(modal, modalStore);
	});
</script>

<Modal />

<AppShell>
	<svelte:fragment slot="header">
		<Navbar />
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
