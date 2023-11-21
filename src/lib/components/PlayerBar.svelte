<script lang="ts">
	import { Tracklist } from '$lib';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	const popupTrackSelect: PopupSettings = {
		event: 'click',
		target: 'popupTrackSelect',
		placement: 'top-start'
	};
</script>

<div class="h-20 w-full flex fixed bottom-0 left-0 p-4">
	<div class="card w-[95%] sm:w-96 shadow-xl" data-popup="popupTrackSelect">
		<Tracklist />
	</div>

	<button
		class="btn bg-gradient-to-br variant-gradient-secondary-tertiary"
		use:popup={popupTrackSelect}
	>
		<span class="capitalize">Tracks</span>
		<i class="fa-solid fa-caret-up" />
	</button>
</div>
