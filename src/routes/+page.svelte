<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcomeFallback from '$lib/images/svelte-welcome.png';
	import { theme } from '../stores/theme'; // Import theme store for light/dark mode

	let currentTheme;
	$: currentTheme = $theme;

	function toggleTheme() {
		theme.set(currentTheme === 'light' ? 'dark' : 'light');
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcomeFallback} alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

	<Counter />

	<!-- Theme Toggle Button -->
	<button class="theme-toggle" on:click={toggleTheme}>
		Switch to {currentTheme === 'light' ? 'Dark' : 'Light'} Mode
	</button>
</section>

<style>
	/* Section Layout */
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
		margin: 0 auto;
		text-align: center;
	}

	h1 {
		width: 100%;
		font-size: 2.4rem;
		line-height: 1.2;
		margin-bottom: 1rem;
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
