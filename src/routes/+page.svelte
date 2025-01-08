<script lang="ts">
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcomeFallback from '$lib/images/svelte-welcome.png';
	import { theme } from '../stores/theme'; // Import theme store for light/dark mode
	import { onMount } from 'svelte';

	// Explicitly type currentTheme
	let currentTheme: 'light' | 'dark';

	// Automatically update currentTheme when theme store changes
	$: currentTheme = $theme;

	// Function to toggle between light and dark modes
	function toggleTheme() {
		theme.set(currentTheme === 'light' ? 'dark' : 'light');
	}

	// Sample data for AI tools
	let aiTools = [
		'ChatGPT',
		'MidJourney',
		'DALL-E',
		'Runway',
		'Copy.ai',
		'Jasper',
		'Grammarly',
		'Canva',
		'Synthesia',
		'DeepL',
		'Descript',
		'Anyword'
	];

	// Reactive search query and results
	let query = '';
	$: filteredTools = aiTools.filter(tool =>
		tool.toLowerCase().includes(query.toLowerCase())
	);

	// Example of highlighting search terms
	function highlightMatch(item: string) {
		if (!query) return item;
		const regex = new RegExp(`(${query})`, 'gi');
		return item.replace(regex, '<mark>$1</mark>');
	}
</script>

<svelte:head>
	<title>AI Tools Search</title>
	<meta name="description" content="Search and explore AI tools" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcomeFallback} alt="Welcome" />
			</picture>
		</span>

		Explore AI Tools
	</h1>

	<h2>
		Find the best AI tools for your needs
	</h2>

	<Counter />

	<!-- Theme Toggle Button -->
	<button class="theme-toggle" on:click={toggleTheme}>
		Switch to {currentTheme === 'light' ? 'Dark' : 'Light'} Mode
	</button>

	<!-- Search Bar -->
	<div class="search-container">
		<input
			type="text"
			placeholder="Search AI tools..."
			bind:value={query}
			class="search-input"
		/>
		<ul class="search-results">
			{#each filteredTools as tool}
				<li>
					{@html highlightMatch(tool)}
				</li>
			{:else}
				<li>No results found</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	/* Section Layout */
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2rem;
		text-align: center;
	}

	h1 {
		font-size: 2.4rem;
		line-height: 1.2;
		margin-bottom: 1rem;
		color: var(--color-theme-1);
	}

	h2 {
		margin-top: 1rem;
		font-size: 1.2rem;
		color: var(--color-theme-2);
	}

	/* Welcome Image Styling */
	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0; /* Aspect ratio: 2048x495 */
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}

	/* Button Styling */
	.theme-toggle {
		margin-top: 2rem;
		padding: 0.5rem 1rem;
		font-size: 1rem;
		background-color: var(--color-theme-1);
		color: #fff;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.theme-toggle:hover {
		background-color: var(--color-theme-2);
	}

	/* Search Container */
	.search-container {
		margin-top: 2rem;
		width: 100%;
		max-width: 600px;
	}

	.search-input {
		width: 100%;
		padding: 0.5rem;
		font-size: 1rem;
		border: 1px solid #ccc;
		border-radius: 5px;
		margin-bottom: 1rem;
	}

	.search-results {
		list-style: none;
		padding: 0;
		margin: 0;
		background: var(--color-bg-1);
		border: 1px solid #ccc;
		border-radius: 5px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	}

	.search-results li {
		padding: 0.5rem;
		font-size: 1rem;
		border-bottom: 1px solid #eee;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	.search-results li:last-child {
		border-bottom: none;
	}

	.search-results li:hover {
		background-color: var(--color-theme-1);
		color: #fff;
	}

	mark {
		background-color: var(--color-theme-2);
		color: #000;
		font-weight: bold;
	}

	/* Responsive Styling */
	@media (min-width: 720px) {
		h1 {
			font-size: 3rem;
		}
		h2 {
			font-size: 1.5rem;
		}
	}
</style>
