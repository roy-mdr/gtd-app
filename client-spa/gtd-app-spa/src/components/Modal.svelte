<script>
	/* imports */
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';
	import Card from './Card.svelte';

	/* props */
	export let modalColor = 'var(--carpet)';
	
	/* data */
	const dispatch = createEventDispatcher();
	let allowExit = false;
	let exitDiv;

	/* mthods */
	function emitCloseModal() {
		dispatch('closeModal');
	}

    function setExit(ev) {
        if (ev.target == exitDiv) {
            allowExit = true;
        }
    }
    
    function tryExit(ev) {
        if (ev.target == exitDiv && allowExit == true) {
            emitCloseModal();
        }
        allowExit = false;
    }

	onMount( () => {
		document.body.style.overflow = "hidden";
	} );

	onDestroy( () => {
		if ( document.querySelectorAll('.modal-wrapper').length - 1 == 0) {
			document.body.style.overflow = "";
		}
	} );
</script>

<div class="modal-wrapper" transition:fade="{{duration: 100}}" >
    <div class="modal-scroller" bind:this="{exitDiv}" on:mousedown="{setExit}" on:mouseup="{tryExit}">
        <div class="modal-margin"></div>
		<Card
            cardColor={modalColor}
            on:closeCard={emitCloseModal}
        >
            <slot></slot>
        </Card>
        <div class="modal-margin"></div>
    </div>
</div>

<style>
.modal-wrapper {
	align-items: center;
	background-color: rgba(0, 0, 0, 0.5);
	color: var(--dark-grey);
	display: flex;
	/* font-family: Trebuchet MS, sans-serif; */
	justify-content: center;
	left: 0;
	margin: 0;
	min-height: 100%;
	min-width: 100%;
	padding: 0;
	position: fixed;
	text-align: left;
	top: 0;
	z-index: 1;
}

.modal-scroller {
	align-items: center;
	display: grid;
	height: 100vh;
	justify-content: center;
	overflow-y: auto;
	width: 100%;
}

.modal-margin {
	background-color: transparent;
	min-height: 100px;
	pointer-events: none;
}
</style>