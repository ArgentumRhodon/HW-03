import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// Although the app theme is memorized with cookies, a theme store is needed to
// update changed executed by client code.
export const storeTheme = writable(
	browser ? document.body.getAttribute('data-theme') ?? '' : 'skeleton'
);
