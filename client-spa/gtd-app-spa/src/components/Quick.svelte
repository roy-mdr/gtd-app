<script>

    import { onMount, createEventDispatcher } from "svelte";

    import { draggingType, draggingData } from '../stores/dragging';

    import QuickFullScreen from './QuickFullScreen.svelte'

    const dispatch = createEventDispatcher();

    let dropQuick;

    onMount(async () => {

        dropQuick.addEventListener("drop", (e) => {
            if ($draggingType !== "idea") return; // Accept only a certain type
            dropQuick.style.backgroundColor = "";
            quickStart($draggingData);
        });

        dropQuick.addEventListener("dragover",  (e) => {
            if ($draggingType !== "idea") return; // Accept only a certain type
            e.preventDefault(); // preventDefault == you can drop in here!
        });

        dropQuick.addEventListener("dragenter", (e) => {
            if ($draggingType !== "idea") return; // Accept only a certain type
            dropQuick.style.backgroundColor = "red";
        });

        dropQuick.addEventListener("dragleave", (e) => {
            if ($draggingType !== "idea") return; // Accept only a certain type
            dropQuick.style.backgroundColor = "";
        });

    });



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
<div bind:this={dropQuick} class="quick" class:drop-here={$draggingType == "idea"} >{":)"}</div>



<style>
.quick {
    /* grid-area: quick; */
    padding: 1em;
}

.drop-here {
    background-color: greenyellow;
}
</style>