<script>
    import Sortable from 'sortablejs';
    import { onMount } from "svelte";

    import { draggingEl, draggingType, draggingData } from '../stores/dragging';

    import InboxInput from './InboxInput.svelte';
    import Quick from './Quick.svelte';
    import IdeaItem from "./IdeaItem.svelte";

    onMount(async () => {
        setUpSortable();
    });

    let inboxEl;

    let myList = [];

    function setUpSortable() {
        Sortable.create(inboxEl, {
            group: {
                name: 'inbox',
                put: false, // Is bad idea to let Sortable handle the DOM manipulation between Lists when Svelte is rendering the DOM by data
                pull: false // Is bad idea to let Sortable handle the DOM manipulation between Lists when Svelte is rendering the DOM by data
            },
            animation: 200,
            delay: 200,
            delayOnTouchOnly: true,
            invertSwap: true,
            swapThreshold: 0.25,
            forceFallback: true,
            onSort: (e) => handleContainerChange(e),
            onStart: (e) => {
                // ~ dragstart:
                draggingEl.update( (el) => e.item ); // trigger
                // ~ own dataTransfer.setData():
                draggingType.update( (t) => "idea" );
                draggingData.update( (d) => myList[e.oldIndex] );
            },
            onEnd: (e) => {
                // ~ dragend:
                // draggingEl.update( (el) => undefined ); // kinda unnecesary (it is handled by the polyfill drop event)
                // ~ own dataTransfer.setData():
                draggingType.update( (t) => "" );
                draggingData.update( (d) => "" );
            },
        });
    };

    function handleContainerChange(ev) {
        const oldLi = myList[ev.oldIndex];		
        myList.splice(ev.oldIndex, 1);
        myList.splice(ev.newIndex, 0, oldLi);
        myList = myList;
    }

    function addItem(e) {
        myList.unshift(e.detail);
        myList = myList;
    }

    function removeItem(ix) {
        myList.splice(ix, 1);
        myList = myList;
    }

</script>



<div class="app-section inbox">

    <span>Inbox</span>

    <hr>

    <InboxInput on:add-item={addItem} />

    <hr>

    <Quick />

    <hr>

    <div class="container" bind:this={inboxEl}>
        {#each myList as listItem, i (listItem.id)}
        <IdeaItem idea={listItem} on:remove={() => removeItem(i)} />
        {/each}
    </div>

    <pre><code>{JSON.stringify(myList, null, 2)}</code></pre>

</div>



<style>
.inbox {
    grid-area: inbox;
}

.container {
    overflow: auto;
    padding: 0.5em;
}
</style>
