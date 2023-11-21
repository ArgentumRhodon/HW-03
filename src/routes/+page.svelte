<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import { PlayerBar } from '$lib';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	const sizeCanvas = () => {
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;
	};

	// const draw = () => {
	// 	ctx.beginPath();
	// 	ctx.arc(100, 100, 50, 0, Math.PI * 2);
	// 	ctx.closePath();
	// 	ctx.fillStyle = 'white';
	// 	ctx.fill();
	// };

	const adjustCanvas = () => {
		sizeCanvas();
		// draw();
	};

	onMount(() => {
		canvas = document.querySelector('canvas') as HTMLCanvasElement;
		ctx = canvas.getContext('2d')!;

		adjustCanvas();
		window.onresize = adjustCanvas;
	});
</script>

<svelte:head>
	<title>SpotifyVis</title>
</svelte:head>

<canvas class="w-full h-full absolute -z-10" />
<PlayerBar />
