<script lang="ts">
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcomeFallback from '$lib/images/svelte-welcome.png';
	import { theme } from '../stores/theme'; // Import theme store for light/dark mode
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

	// Explicitly type currentTheme
	let currentTheme: 'light' | 'dark';

	// Automatically update currentTheme when theme store changes
	$: currentTheme = $theme;

	// Function to toggle between light and dark modes
	function toggleTheme() {
		theme.set(currentTheme === 'light' ? 'dark' : 'light');
	}

	// Three.js Setup
	let canvasContainer;

	onMount(() => {
		// Scene, Camera, Renderer
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		const renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		canvasContainer.appendChild(renderer.domElement);

		// Sphere Geometry
		const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
		const sphereMaterial = new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader().load(
				'/textures/grid-image.jpg', // Update with your texture path
				() => console.log('Texture loaded successfully'),
				undefined,
				(error) => console.error('Error loading texture', error)
			),
		});
		const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
		sphere.material.side = THREE.DoubleSide; // Ensure the texture is visible on the inside
		scene.add(sphere);

		// Lights (Optional)
		const light = new THREE.AmbientLight(0xffffff);
		scene.add(light);

		// Orbit Controls
		const controls = new OrbitControls(camera, renderer.domElement);

		// Camera Position
		camera.position.z = 10;

		// Animation Loop
		function animate() {
			requestAnimationFrame(animate);

			// Add rotation for auto movement
			sphere.rotation.y += 0.005;

			renderer.render(scene, camera);
		}
		animate();

		// Handle Resize
		window.addEventListener('resize', () => {
			renderer.setSize(window.innerWidth, window.innerHeight);
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		});
	});
</script>

<svelte:head>
	<title>AI Tools Search with 3D Sphere</title>
	<meta name="description" content="Explore AI tools with a 3D interactive sphere and search functionality" />
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
</section>

<!-- Canvas container for Three.js -->
<div bind:this={canvasContainer} class="canvas-container"></div>

<style>
	/* Section Layout */
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2rem;
		text-align: center;
		position: relative;
		z-index: 1;
		background-color: transparent;
	}

	h1 {
		font-size: 2.4rem;
		margin-bottom: 1rem;
		color: var(--color-theme-1);
	}

	h2 {
		font-size: 1.2rem;
		color: var(--color-theme-2);
	}

	.theme-toggle {
		margin-top: 2rem;
		padding: 0.5rem 1rem;
		background-color: var(--color-theme-1);
		color: #fff;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}

	.canvas-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -1;
	}
</style>
