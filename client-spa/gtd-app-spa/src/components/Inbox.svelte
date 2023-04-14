<script>
    import Sortable from 'sortablejs';
    import { onMount, createEventDispatcher } from "svelte";

    import { draggingType, draggingData, draggingParentEl } from '../stores/dragging';
    import { inbox } from '../stores/appData';

    import InboxInput from './InboxInput.svelte';
    import Quick from './Quick.svelte';
    import IdeaItem from "./IdeaItem.svelte";

    const dispatch = createEventDispatcher();

    onMount(async () => {
        setUpSortable();
    });

    let inboxEl;

    function setUpSortable() {
        Sortable.create(inboxEl, {
            group: {
                name: 'inbox',
                put: false,
                // pull: false
            },
            revertDOM: true,
            animation: 200,
            delay: 200,
            delayOnTouchOnly: true,
            invertSwap: true,
            swapThreshold: 0.25,
            // forceFallback: true,
            onSort: (e) => handleContainerChange(e),
            onStart: (e) => {
                // ~ dragstart:
                // draggingEl.update( (el) => e.item ); // trigger
                // ~ own dataTransfer.setData():
                draggingType.update( (t) => "idea" );
                draggingData.update( (d) => $inbox[e.oldIndex] );
                draggingParentEl.update( (p) => inboxEl );
            },
            onEnd: (e) => {
                // ~ dragend:
                // draggingEl.update( (el) => undefined ); // kinda unnecesary (it is handled by the polyfill drop event)
                // ~ own dataTransfer.setData():
                draggingType.update( (t) => "" );
                draggingData.update( (d) => "" );
                draggingParentEl.update( (p) => undefined );
            },
        });

        inboxEl.addEventListener('removeItem', (e) => {
            removeItem(e.detail);
        })
    };

    function handleContainerChange(ev) {
        const oldLi = $inbox[ev.oldIndex];
        $inbox.splice(ev.oldIndex, 1);
        $inbox.splice(ev.newIndex, 0, oldLi);
        $inbox = $inbox;
    }

    function addItem(e) {
        inbox.addIdea(e.detail);
    }

    function removeItem(ix) {
        inbox.removeIdeaByIndex(ix);
    }

    function removeItemById(ideaId) {
        inbox.removeIdeaById(ideaId);
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
        {#each $inbox as listItem, i (listItem.id)}
        <!-- I found that wrapping in a div all your code inside an each block helps a LOT with DOM consistency :) fck that bug... but quite my fault tbh -->
        <div>
            <IdeaItem
                idea={listItem}
                on:remove={(e) => removeItem(i)}
                on:to-quick={(e) => { toQuick(listItem) }}
                on:to-calendar={(e) => {  }}
                on:to-tickler={(e) => {  }}
                on:to-nest={(e) => { dispatch('inbox-to-nest', listItem) }}
                on:to-reference={(e) => {  }}
                on:to-help={(e) => {  }}
            />
        </div>
        {/each}
    </div>

    <!-- <pre><code>{JSON.stringify($inbox, null, 2)}</code></pre> -->

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
