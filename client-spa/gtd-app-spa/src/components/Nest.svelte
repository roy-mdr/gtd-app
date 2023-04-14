<script>
    import { nest } from '../stores/appData';
    import Sortable from 'sortablejs';
    import { onMount } from "svelte";
    import IncubatorNew from './IncubatorNew.svelte';
    import Incubator from './Incubator.svelte';
    import InboxToNest from './InboxToNest.svelte';

    onMount(async () => {
        setUpSortable();
    });

    export function fromInboxClick(ev) {
        inboxToNest = {
            incubator: null,
            project: null,
            idea: ev.detail
        }
    }

    function fromInboxDrag(ev) {
        inboxToNest = ev.detail;
    }

    let nestContentEl;
    let isHover = false;

    function setUpSortable() {
        Sortable.create(nestContentEl, {
            group: {
                name: 'nest',
                put: false,
                pull: false
            },
            revertDOM: true,
            animation: 200,
            delay: 200,
            delayOnTouchOnly: true,
            invertSwap: true,
            swapThreshold: 0.25,
            // fallbackOnBody: true,
            // forceFallback: true,
            onSort: (e) => handleContainerChange(e),
            onStart: (e) => {},
            onEnd: (e) => {},
            onDragIn:  (e) => { isHover = true },
            onDragOut: (e) => { isHover = false },
            onAdd: (e) => {},
        });
    };

    function handleContainerChange(ev) {
        const oldLi = $nest[ev.oldIndex];
        $nest.splice(ev.oldIndex, 1);
        $nest.splice(ev.newIndex, 0, oldLi);
        $nest = $nest;
    }

    let inboxToNest = false;

</script>



<div class="app-section nest">
    NEST
    <IncubatorNew />
    <button>Expand</button>
    <div bind:this={nestContentEl} class="container">
        {#each $nest as incubator, nestIndex (incubator.id)}
            <Incubator
            incubatorData={incubator}
            on:update={() => {$nest = $nest}}
            on:inbox-to-incubator={fromInboxDrag}
            />
        {/each}
    </div>
</div>
<!-- <div style="z-index: 100;">
    <pre><code>{JSON.stringify($nest, null, 2)}</code></pre>
</div> -->

{#if inboxToNest}
<InboxToNest metaIdea={inboxToNest} on:closeModal={ () => { inboxToNest = false; } } />
{/if}



<style>
    .nest {
        grid-area: nest;

        /* display: flex; */
    }

    .container {
        display: flex;
    }
</style>