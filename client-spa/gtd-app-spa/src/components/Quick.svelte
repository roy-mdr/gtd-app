<script>
    import Sortable from 'sortablejs';

    import { onMount, createEventDispatcher } from "svelte";

    import { draggingType, draggingData } from '../stores/dragging';

    import QuickFullScreen from './QuickFullScreen.svelte'

    const dispatch = createEventDispatcher();

    onMount(async () => {
        setUpSortable();
    });

    let dropQuick;
    let isHover = false;

    function setUpSortable() {
        Sortable.create(dropQuick, {
            group: {
                name: 'quick',
                put: ['inbox']
            },
            revertDOM: true,
            animation: 200,
            delay: 200,
            delayOnTouchOnly: true,
            invertSwap: true,
            swapThreshold: 0.25,
            onDragIn:  (e) => { isHover = true },
            onDragOut: (e) => { isHover = false },
            onAdd: (e) => {
                // drag from one list and drop into another

                if (e.fromSortable.options.group.name == 'inbox' &&  $draggingType == "idea" && isHover ) {
                    quickStart($draggingData);
                }

                isHover = false;
            },
        });
    };



    let ideaObj;
    let quickOn = false;



    export function quickStart(gotIdeaObj) {
        ideaObj = gotIdeaObj;
        quickOn = true;
    }

    function quickSkip() {
        console.log("Quick Skip")
        quickOn = false;
    }

    function quickDone() {
        dispatch('quick-done', ideaObj.id);
        quickOn = false;
    }
</script>



{#if quickOn}
<QuickFullScreen
taskText={ideaObj.text}
on:skip={quickSkip}
on:done={quickDone}
/>
{/if}

QUICK
<div bind:this={dropQuick} class="quick" class:drop-here={$draggingType == "idea"} class:hovered={isHover} ><span>{":) "}{isHover}</span></div>



<style>
.quick {
    /* grid-area: quick; */
    padding: 1em;
}

.quick :global(.sortable-ghost) {
    display: none !important;
}

.drop-here {
    background-color: greenyellow;
}

.hovered {
    border: 2px solid red !important;
}
</style>