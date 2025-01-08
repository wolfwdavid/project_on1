import { writable } from 'svelte/store';

// Default to the user's system preference
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
export const theme = writable(prefersDark ? 'dark' : 'light');

// Save the theme to localStorage
theme.subscribe((value) => {
    document.documentElement.setAttribute('data-theme', value);
    localStorage.setItem('theme', value);
});
