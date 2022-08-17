<script>
    import Sortable from 'sortablejs';
    import { onMount } from "svelte";

    import InboxInput from './InboxInput.svelte';
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
                put: false
            },
            ghostClass: "sort-item-ghost",  // Class name for the drop placeholder
            // chosenClass: "sort-item-chosen",  // Class name for the chosen item
            // dragClass: "sort-item-drag",  // Class name for the dragging item
            animation: 200,
            delay: 200,
            delayOnTouchOnly: true,
            invertSwap: true,
            swapThreshold: 0.25,
            onSort: (e) => handleContainerChange(e)
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



<div class="inbox">

    <span>Inbox</span>

    <InboxInput on:add-item={addItem} />

    <hr>

    <div class="container" bind:this={inboxEl}>
        {#each myList as listItem, i (listItem.id)}
        <IdeaItem idea={listItem} on:remove={() => removeItem(i)} />
        {/each}
    </div>

</div>



<style>
.inbox {
    background-color: white;
    /* border: 1px solid lightblue; */
    border-radius: 5px;
    margin: 1em;
    box-shadow: 0px 1px 1px 0 rgb(0 0 0 / 10%);
    max-width: 200px;
}

.container {
    overflow: auto;
    padding: 0.5em;
    height: 80vh;
}

:global(.sort-item-ghost) {
    opacity: 0 !important;
}

:global(.sort-item-chosen) {
}

:global(.sort-item-drag) {
}

</style>
