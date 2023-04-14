<script>

	import Inbox from './components/Inbox.svelte';
	import Nest from './components/Nest.svelte';
	import Navbar from './components/Navbar.svelte';
	import Calendar from './components/Calendar.svelte';
	import Notes from './components/Notes.svelte';
	import Actionables from './components/Actionables.svelte';

	let elInbox, elNest, elCalendar, elNotes, elActionables;
</script>

<main class="app light-theme">
	<!-- <h1>Getting Things Done!</h1> -->
	<Navbar />

	<section class="view-main">
		<Inbox bind:this={elInbox}
			on:inbox-to-nest={elNest.fromInboxClick}
		/>
		<Nest bind:this={elNest} />
		<Calendar bind:this={elCalendar} />
		<Notes bind:this={elNotes} />
		<Actionables bind:this={elActionables} />
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