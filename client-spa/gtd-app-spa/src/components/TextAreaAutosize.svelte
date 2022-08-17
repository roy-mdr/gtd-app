<script>

    import { createEventDispatcher } from 'svelte';

	export let value = '';
	export let minRows = 1;
	export let maxRows;
	export let disabled = false;
	export let shiftToNL = false;

	export function focuss() {
		// ?? doesn't work without the timeout
		// from: https://stackoverflow.com/questions/19336794/in-javascript-setting-a-textarea-with-focus-does-not-work-if-called-as-a-child
		setTimeout(function() {
			textareaEl.focus();
		}, 0);
	}

	let textareaEl;

	$: minHeight = `${1 + minRows * 1.2}em`;
	$: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;

    function handleEnter(e) {

        if (!shiftToNL) return;

        // Get the code of pressed key
        const keyCode = e.which || e.keyCode;

        // 13 represents the Enter key
        if (keyCode === 13 && !e.shiftKey) {
            // Don't generate a new line
            e.preventDefault();

            // Do something else such as send the message to back-end
            emmitEnter();
        }
    }

    const dispatch = createEventDispatcher();

    function emmitEnter() {
        dispatch('enter');
    }
</script>

<div class="container">
	<pre
		aria-hidden="true"
		style="min-height: {minHeight}; max-height: {maxHeight}"
	>{value + '\n'}</pre>

	<textarea bind:this={textareaEl} bind:value {disabled} on:keydown={(e)=>{handleEnter(e)}}></textarea>	
</div>

<style>
	.container {
		position: relative;
	}

    pre {
        overflow: hidden;
        visibility: hidden;
		white-space: -moz-pre-wrap;
		white-space: -o-pre-wrap;
		white-space: pre-wrap;
		word-wrap: break-word;
    }
	
	pre, textarea {
		font-family: inherit;
		padding: 0.5em;
		box-sizing: border-box;
		border: 1px solid #eee;
		line-height: 1.2;
        margin: 0;
	}
	
	textarea {
        top: 0;
		position: absolute;
		width: 100%;
		height: 100%;
		resize: none;
		overflow: auto;
        background: none;
        border: none;
	}
</style>
