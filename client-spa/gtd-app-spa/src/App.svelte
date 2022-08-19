<script>

	import { onMount } from "svelte";

	import { draggingEl, overEl, enterEl } from './stores/dragging';

	import Inbox from './components/Inbox.svelte';
	import Nest from './components/Nest.svelte';
	import Navbar from './components/Navbar.svelte';
	import Calendar from './components/Calendar.svelte';
	import Notes from './components/Notes.svelte';
	import Today from './components/Today.svelte';

	onMount(async () => {

		// Touch:
		document.addEventListener("touchmove", (e) => {
			if ($draggingEl === undefined || $draggingEl === null) return;
			// ~ drag:
			$draggingEl.dispatchEvent(new Event('drag'));
			overEl.update( (el) => document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) );

			if ($overEl === undefined || $overEl === null) return;
			// ~ dragover:
			$overEl.dispatchEvent(new Event('dragover'));

			if ($enterEl !== $overEl) {
				if ($enterEl) {
                    // ~ dragleave:
					$enterEl.dispatchEvent(new Event('dragleave'));
                }
				// ~ dragenter:
				$overEl.dispatchEvent(new Event('dragenter'));
				enterEl.update( (el) => $overEl );
			}
		});

		document.addEventListener("touchend", (e) => {
			if ($draggingEl === undefined || $draggingEl === null) return;
			// ~ drop:
			// console.log("drop touch", $draggingEl );
			// console.log("in", $overEl );

			if ($overEl !== undefined && $overEl !== null) {
				$overEl.dispatchEvent(new Event('drop'));
				overEl.update( (el) => undefined );
			}

			enterEl.update( (el) => undefined );

			$draggingEl.dispatchEvent(new Event('dragend'));
			draggingEl.update( (el) => undefined );
		});

		// HTML Fallback:
		document.addEventListener("mousemove", (e) => {
			if ($draggingEl === undefined || $draggingEl === null) return;
			// ~ drag:
			$draggingEl.dispatchEvent(new Event('drag'));
			overEl.update( (el) => document.elementFromPoint(e.clientX, e.clientY) );

			if ($overEl === undefined || $overEl === null) return;
			// ~ dragover:
			$overEl.dispatchEvent(new Event('dragover'));

			if ($enterEl !== $overEl) {
				if ($enterEl) {
                    // ~ dragleave:
					$enterEl.dispatchEvent(new Event('dragleave'));
                }
				// ~ dragenter:
				$overEl.dispatchEvent(new Event('dragenter'));
				enterEl.update( (el) => $overEl );
			}
		});

		document.addEventListener("mouseup", (e) => {
			if ($draggingEl === undefined || $draggingEl === null) return;
			// ~ drop:
			// console.log("drop mouse fallback", $draggingEl );
			// console.log("in", $overEl );

			if ($overEl !== undefined && $overEl !== null) {
				$overEl.dispatchEvent(new Event('drop'));
				overEl.update( (el) => undefined );
			}

			enterEl.update( (el) => undefined );

			$draggingEl.dispatchEvent(new Event('dragend'));
			draggingEl.update( (el) => undefined );
		});

	});



</script>

<main class="app">
	<!-- <h1>Getting Things Done!</h1> -->
	<Navbar />

	<section class="view-main">
		<Inbox />
		<Nest />
		<Calendar />
		<Notes />
		<Today />
	</section>
</main>

<style>
.app {
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
}

.view-main {
	display: grid;
	grid-template-columns: minmax(50px, 250px) minmax(50px, 100px) minmax(100px, auto) minmax(50px, 250px);
	grid-template-rows: minmax(50px, 200px) auto minmax(50px, 100px);
	grid-template-areas: 
		"inbox  nest     nest     today"
		"inbox  calendar calendar today"
		"inbox  notes    notes    today"
	;
	column-gap: 1em;
	row-gap: 1em;

	margin: 1em;

	width: auto;
	height: 100%;
}
</style>