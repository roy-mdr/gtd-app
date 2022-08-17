<script>

    import { createEventDispatcher } from 'svelte';

    export let idea;

    const dispatch = createEventDispatcher();

    function removeItem() {
        dispatch('remove');
    }

</script>



<div class="idea" on:mouseenter={() => {idea.hover = true;}} on:mouseleave={() => {idea.hover = false;}}>
    {#if idea.hover}
    <button type="button" class="remove" on:click={() => removeItem()}>X</button>
    {/if}
    {idea.name}
</div>



<style>

.idea {
    background-color: white;
    border: 1px solid white;
    border-radius: 5px;
    margin-bottom: 0.5em;
    box-shadow: 0px 1px 1px 0 rgb(0 0 0 / 10%);
    padding: 0.5em;
    transition: border 0.2s, box-shadow 0.2s;
}

.idea:hover {
    border: 1px solid lightblue;
    box-shadow: 0px 10px 20px 0 rgb(0 0 0 / 10%);
}
</style>