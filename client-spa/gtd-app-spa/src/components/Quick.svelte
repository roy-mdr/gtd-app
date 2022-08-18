<script>

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
    {timer}
    <button type="button" on:click={quickSkip}>Skip...</button>
    <button type="button" on:click={quickDone}>Done!</button>
</div>
{/if}

QUICK
<div class="quick" on:click={quickStart}></div>


<style>
.quick {
    /* grid-area: quick; */
    padding: 1em;
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