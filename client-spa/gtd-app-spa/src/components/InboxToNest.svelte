<script>
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';

	import { inbox, nest } from '../stores/appData';

	import Modal from './Modal.svelte'

	const dispatch = createEventDispatcher();

	export let metaIdea;

	let inputTask;
	let selectIncubator;
	let projects = [];
	let selectProject = "unset";
	let inheritDeadline = false;
	let timeRequired = 0;
	let cost = 0;
	let onlyAfter = "";
	let tags = "";

	let incubatorName, projectName;

	onMount( async () => {
		inputTask.focus();

		if (metaIdea.incubator) {
			for (let i = 0; i < $nest.length; i++) {
				if ($nest[i].id == metaIdea.incubator) {

					incubatorName = $nest[i].name;
					selectIncubator = i;

					if (metaIdea.project) {
						for (let p = 0; p < $nest[i].content.length; p++) {
							if ($nest[i].content[p].id == metaIdea.project && $nest[i].content[p].type === "project") {

								projectName = $nest[i].content[p].name;
								selectProject = p;
								break;
							}
						}
					}

					break;
				}
			}
		}
	} );

	function nestAdd() {
		nest.addTask(selectIncubator, selectProject, {
			type: "task",
			id: metaIdea.idea.id,
			text: metaIdea.idea.text,
			tags: ["p", "o"],
			deadline: "Date",
			time: "Int",
			cost: "Int",
			after: "Task"
		});

		inbox.removeIdeaById(metaIdea.idea.id);

		dispatch('closeModal');
	}

	function getProjects(watcher) {
		if (selectIncubator === undefined) return;
		selectProject = "unset";
		projects = $nest[selectIncubator].content;
	}
	$: getProjects(selectIncubator);
</script>

<Modal on:closeModal>
	<div class="card-seccion">
		<span class="titulo">Edit</span>
		<span class="nota">Make it actionable!</span>
		<span class="nota">- start with a verb</span>
		<span class="nota">- only one action</span>
		<input type="text" bind:this={inputTask} bind:value={metaIdea.idea.text}>
	</div>
	<div class="card-seccion">

		<span class="titulo">Location</span>

		<select bind:value={selectIncubator}>
			{#each $nest as incubator, incubatorIx }
			<option value={incubatorIx}>{incubator.name}</option>
			{/each}
		</select>

		<select bind:value={selectProject}>
			<option value="unset">- No project -</option>
			{#each projects as project, projectIx }
			{#if project.type == 'project'}
			<option value={projectIx}>{project.name}</option>
			{/if}
			{/each}
		</select>

		
	</div>
	<div class="card-seccion">
		<span class="titulo">Config</span>
		<details>
			<summary>options</summary>
			<div style="display: flex; flex-direction: column;">
				<span class="nota">Deadline</span>
				{#if selectProject != "unset" }
				<span class="nota">Inherit from project</span>
				<input type="checkbox" bind:checked={inheritDeadline}>
				{/if}
				{#if !inheritDeadline }
				<input type="date">
				{/if}
				<span class="nota">Time rquired</span>
				<input type="number" bind:value={timeRequired}>
				<span class="nota">Cost</span>
				<input type="number" bind:value={cost}>
				<span class="nota">Only if ___ is done</span>
				<input type="text" bind:value={onlyAfter}>
				<span class="nota">Tags</span>
				<input type="text" bind:value={tags}>
			</div>
		</details>
	</div>
	<div class="card-action_buttons">
		<button type="button" class="aceptar" on:click={nestAdd}>OK</button>
	</div>
</Modal>