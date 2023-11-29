<script lang="ts">
	import { invalidateAll } from '$app/navigation';

	// Component Info: This is a login button that functions both with and
	// without JavaScript enabled. When using JavaScript, the submission
	// will send a fetch request with identifying headers.
</script>

<form
	method="POST"
	action="/api/auth/logout"
	on:submit|preventDefault={async () => {
		const response = await fetch('/api/auth/logout', {
			method: 'POST',
			headers: {
				accept: 'application/json'
			}
		});
		if (response.ok) {
			invalidateAll();
		}
	}}
>
	<button type="submit" class="btn variant-filled-error">Logout</button>
</form>
