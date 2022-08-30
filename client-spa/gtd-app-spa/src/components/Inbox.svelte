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
            revertDOM: true,
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

    function removeItemById(ideaId) {
        for (let i = 0; i < myList.length; i++) {
            if (myList[i].id == ideaId) {
                myList.splice(i, 1);
                break;
            }
        }

        myList = myList;

        // Update Inbox in server
        // Add Idea to tasks done (from: inbox) and update in server
    }



    let quickComponent;
    function toQuick(ideaObj) {
        quickComponent.quickStart(ideaObj);
    }

</script>



<div class="app-section inbox">

    <span>Inbox</span>

    <hr>

    <InboxInput on:add-item={addItem} />

    <hr>

    <Quick bind:this={quickComponent} on:quick-done={(e) => { removeItemById(e.detail) }} />

    <hr>

    <div class="container" bind:this={inboxEl}>
        {#each myList as listItem, i (listItem.id)}
        <IdeaItem
            idea={listItem}
            on:remove={(e) => removeItem(i)}
            on:to-quick={(e) => { toQuick(listItem) }}
            on:to-calendar={(e) => {  }}
            on:to-tickler={(e) => {  }}
            on:to-nest={(e) => {  }}
            on:to-reference={(e) => {  }}
            on:to-help={(e) => {  }}
        />
        {/each}
    </div>

    <!-- <pre><code>{JSON.stringify(myList, null, 2)}</code></pre> -->

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
