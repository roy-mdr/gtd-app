<script>

    import { slide } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';

    import clickOutside from "../lib/clickOutside";
    import TextAreaAutosize from './TextAreaAutosize.svelte';

    export let idea = {
        id: "",
        text: "",
    };

    let menuIsOpen = false;
    let allowDelete = false;
    let textareaAR;

    const dispatch = createEventDispatcher();

    function askRemoveItem() {
        allowDelete = true;
    }

    function removeItem() {
        dispatch('remove');
    }

    function openMenu() {
        menuIsOpen = true;
        allowDelete = false;
        textareaAR.focuss();
    }

    function closeMenu() {
        menuIsOpen = false;
        allowDelete = false;
    }

    function handleClickOutsideDelete() {
        allowDelete = false;
    }

</script>



<div class="idea" transition:slide={{duration: 200}} use:clickOutside on:click_outside={closeMenu}>
    {#if menuIsOpen}
    <div class="shadow" transition:slide={{duration: 100}}>
        <div class="menu-row">
            <button type="button" class="remove" on:click={()=>{dispatch('to-quick')}}>⚡</button>
            <button type="button" class="remove" on:click={()=>{dispatch('to-calendar')}}>📆</button>
            <button type="button" class="remove" on:click={()=>{dispatch('to-tickler')}}>🔔</button>
        </div>
        <div class="menu-row">
            <button type="button" class="remove" on:click={()=>{dispatch('to-nest')}}>🥚</button>
            <button type="button" class="remove" on:click={()=>{dispatch('to-reference')}}>📝</button>
            <button type="button" class="remove" on:click={()=>{dispatch('to-help')}}>❔</button>
        </div>
    </div>
    {:else}
    <div class="open-menu" on:click={openMenu}></div>
    {/if}

    <TextAreaAutosize bind:this={textareaAR} bind:value={idea.text} disabled={!menuIsOpen} minRows="1" maxRows="10" />

    {#if menuIsOpen}
    <div class="menu-row shadow" transition:slide={{duration: 200}}>
        <button type="button" class="remove" class:hidden={allowDelete} on:click={askRemoveItem}>🗑</button>
        <button type="button" class="remove delete" class:hidden={!allowDelete} on:click={removeItem} use:clickOutside on:click_outside={handleClickOutsideDelete}>❗</button>
    </div>
    {/if}
</div>



<style>
.idea {
    background-color: white;
    border: 1px solid white;
    border-radius: 5px;
    margin-bottom: 0.5em;
    box-shadow: 0px 1px 1px 0 rgb(0 0 0 / 10%);
    padding: 0;
    transition: border 0.2s, box-shadow 0.2s;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.idea:hover {
    box-shadow: 0px 5px 10px 0 rgb(0 0 0 / 10%);
}

.idea:focus-within {
    border: 1px solid lightblue;
}

.open-menu {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.menu-row {
    display: flex;
    align-items: center;
    justify-content: center;
}

.menu-row button {
    width: 100%;
    border: none;
    background-color: transparent;
    transition: background-color 0.2s;
}

.menu-row button:hover {
    background-color: lightblue;
}

.hidden {
    display: none;
}

.menu-row button.delete,
.menu-row button.delete:hover {
    background-color: indianred;
}

.shadow {
    box-shadow: 0px 0px 5px 0 rgb(0 0 0 / 10%);
}
</style>
