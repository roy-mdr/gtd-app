<script>

    import { onMount } from "svelte";

    import { draggingEl, draggingType, draggingData } from '../stores/dragging';

    let dropQuick,dragMe;

    onMount(async () => {

        dropQuick.addEventListener("drop", (e) => {
            console.log("HTML5 drop");
            if ($draggingType !== "idea") return; // Accept only a certain type
            dropQuick.style.backgroundColor = "";
            taskText = $draggingData.text;
            quickStart();
        });

        dropQuick.addEventListener("dragover",  (e) => {
            console.log("HTML5 dragover");
            if ($draggingType !== "idea") return; // Accept only a certain type
            e.preventDefault(); // preventDefault == you can drop in here!
        });

        dropQuick.addEventListener("dragenter", (e) => {
            console.log("HTML5 dragenter");
            if ($draggingType !== "idea") return; // Accept only a certain type
            dropQuick.style.backgroundColor = "red";
        });

        dropQuick.addEventListener("dragleave", (e) => {
            console.log("HTML5 dragleave");
            if ($draggingType !== "idea") return; // Accept only a certain type
            dropQuick.style.backgroundColor = "";
        });



        dragMe.addEventListener("drag", (e) => {
            console.log("HTML5 drag");
            dragMe.style.backgroundColor = "purple";
        });

        dragMe.addEventListener("dragend", (e) => {
            console.log("HTML5 dragend");
            draggingType.update( (t) => "" );
            draggingData.update( (d) => "" );
            dragMe.style.backgroundColor = "orange";
        });


        // dragstart:
        /* dragMe.addEventListener("dragstart", (e) => {
            console.log("HTML5 dragstart");
            draggingEl.update( (el) => dragMe ); // trigger
            draggingType.update( (t) => "idea" );
            draggingData.update( (d) => { return {text: "container :)"} } );
            dragMe.style.backgroundColor = "blue";
        }); */

        dragMe.addEventListener("mousedown", (e) => {
            e.preventDefault();
            console.log("HTML5 mousedown");
            draggingEl.update( (el) => dragMe ); // trigger
            draggingType.update( (t) => "idea" );
            draggingData.update( (d) => { return {text: "container :)"} } );
            dragMe.style.backgroundColor = "blue";
        });

        dragMe.addEventListener("touchstart", (e) => {
            e.preventDefault();
            console.log("HTML5 touchstart");
            draggingEl.update( (el) => dragMe ); // trigger
            draggingType.update( (t) => "idea" );
            draggingData.update( (d) => { return {text: "container :)"} } );
            dragMe.style.backgroundColor = "blue";
        });

    });



    let taskText = "Random task! :D"
    let quickOn = false;
    let timer = "";
    let interval;

    function countdownTimeStart(countDownDate, timeoutCallback, options = {days: true, hours: true, minutes: true, seconds: true}) {

        if (options.days    == undefined) options.days    = true;
        if (options.hours   == undefined) options.hours   = true;
        if (options.minutes == undefined) options.minutes = true;
        if (options.seconds == undefined) options.seconds = true;

        // Get todays date and time
        let now = nowInSeconds();

        // Find the time diference between now an the count down date
        let timeDiff = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        let days    = Math.floor( timeDiff / (1000 * 60 * 60 * 24));
        let hours   = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        // Output the result in an variable "timer"
        timer = "";
        if (options.days   ) timer += days    + "d "
        if (options.hours  ) timer += hours   + "h "
        if (options.minutes) timer += minutes + "m "
        if (options.seconds) timer += seconds + "s "

        // If the count down is over, write some text
        if (timeDiff < 0) {
            clearTimeout(interval);
            timer = "EXPIRED";
            timeoutCallback();
        }

        // Update the count down every 1 second
        interval = setTimeout(() => {
            countdownTimeStart(countDownDate, timeoutCallback, options);
        }, 1000);
    }

    function nowInSeconds() {
        return Math.floor( (new Date().getTime()) / 1000 ) * 1000;
    }



    function quickStart() {
        quickOn = true;

        const countDate = nowInSeconds() + 120000; // Count date in 2min
        countdownTimeStart(countDate, quickSkip, {days: false, hours: false, minutes: true, seconds: true});
    }

    function quickSkip() {
        clearTimeout(interval);
        quickOn = false;
    }

    function quickDone() {
        clearTimeout(interval);
        quickOn = false;
    }
</script>



{#if quickOn}
<div class="quick-on">
    {taskText}
    {timer}
    <button type="button" on:click={quickSkip}>Skip...</button>
    <button type="button" on:click={quickDone}>Done!</button>
</div>
{/if}

QUICK
<div bind:this={dropQuick} class="quick" class:drop-here={$draggingType == "idea"} >{":)"}</div>
<div bind:this={dragMe} class="quick">{"Drag me!"}</div>


<style>
.quick {
    /* grid-area: quick; */
    padding: 1em;
}

.drop-here {
    background-color: greenyellow;
}

.quick-on {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #F1F4F5;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
</style>