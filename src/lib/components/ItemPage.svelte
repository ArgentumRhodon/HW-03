<script lang="ts">
	export let imageURL: string | undefined;
	export let name: string;
	export let type: string | undefined;
</script>

<div class="flex gap-4 flex-col sm:flex-row mb-4">
	<img class="aspect-square w-full sm:w-64 shadow-lg" src={imageURL} alt={name} />
	<div class="flex flex-col justify-end gap-4">
		{#if type}
			<h2 class="h6">
				<!-- Capitalize type -->
				{type.charAt(0).toUpperCase() + type.slice(1)}
			</h2>
		{/if}
		<h1 class="h1">{name}</h1>
		<slot name="meta" />
	</div>
</div>

<slot />
