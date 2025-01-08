import { writable } from 'svelte/store';

// Safely access window and localStorage
const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;

// Default theme based on saved value or system preference
export const theme = writable(savedTheme || (prefersDark ? 'dark' : 'light'));

// Subscribe to changes and update document or localStorage only in the browser
if (typeof window !== 'undefined') {
    theme.subscribe((value) => {
        document.documentElement.setAttribute('data-theme', value);
        localStorage.setItem('theme', value);
    });
}
