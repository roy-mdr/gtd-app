<script>

    import { onMount } from "svelte";

    import { draggingType, draggingData } from '../stores/dragging';

    import QuickFullScreen from './QuickFullScreen.svelte'

    let dropQuick;

    onMount(async () => {

        dropQuick.addEventListener("drop", (e) => {
            if ($draggingType !== "idea") return; // Accept only a certain type
            dropQuick.style.backgroundColor = "";
            taskText = $draggingData.text;
            quickStart();
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



    let taskText = "Random task! :D";
    let quickOn = false;



    function quickStart() {
        quickOn = true;
    }

    function quickSkip() {
        console.log("Quick Skip")
        quickOn = false;
    }

    function quickDone() {
        console.log("Quick Done!")
        quickOn = false;
    }
</script>



{#if quickOn}
<QuickFullScreen
{taskText}
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