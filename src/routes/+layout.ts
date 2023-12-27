import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

// Client code is needed to determine which pages the user can be on depending
// on auth state
export const load = (async ({ data, url }) => {
	const { user } = data || {};
	// If logged in a on the login page, redirect home
	if (user && url.pathname === '/login') {
		throw redirect(307, '/');
	}
	// If not logged in and on any other page, redirect to login
	if (!user && url.pathname !== '/login') {
		throw redirect(307, '/login');
	}
	// Else, return the user as normal (server and client side must both return
	// the user if both exist)
	return {
		user
	};
}) satisfies LayoutLoad;
