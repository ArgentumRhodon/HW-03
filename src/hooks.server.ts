import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	let theme = '';

	// Get stored theme
	const cookieTheme = event.cookies.get('theme');

	console.log("Cookies: " + cookieTheme);

	// If it exists, set theme
	if (cookieTheme) {
		theme = cookieTheme;
	} else {
		// If not, set default theme to "skeleton"
		event.cookies.set('theme', 'skeleton', {expires: new Date('9999-12-31T23:59:59')});
		theme = 'skeleton';
	}

	// Resolve the hook and pass along a server-instructed page transform, preventing an FOUC
	return await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
	});
};
