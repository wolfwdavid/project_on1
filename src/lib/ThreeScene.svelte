<script>
	import * as THREE from 'three';
	import { onMount } from 'svelte';

	let canvasContainer;

	onMount(() => {
		// Scene, Camera, Renderer
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		const renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		canvasContainer.appendChild(renderer.domElement);

		// Add a Cube
		const geometry = new THREE.BoxGeometry();
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);

		camera.position.z = 5;

		// Animation Loop
		function animate() {
			requestAnimationFrame(animate);
			cube.rotation.x += 0.01;
			cube.rotation.y += 0.01;
			renderer.render(scene, camera);
		}
		animate();

		// Handle Window Resize
		window.addEventListener('resize', () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		});
	});
</script>

<div bind:this={canvasContainer} style="width: 100vw; height: 100vh;"></div>

<style>
	div {
		position: absolute;
		top: 0;
		left: 0;
		overflow: hidden;
	}
</style>
