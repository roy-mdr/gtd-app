<script>
    import TextAreaAutosize from './TextAreaAutosize.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let newItem = "";

    function addItem() {

        if (newItem == "") return;

        const newListItem = {
            id: Math.random(),
            text: newItem,
        }

        dispatch('add-item', newListItem);

        newItem = "";
    }

    function startRecording() {
        console.log("start recording")
    }

    function clipboardPaste() {
        console.log("paste from clipboard")
    }

</script>



<form on:submit|preventDefault={addItem}>
    <div class="idea-input">
        <TextAreaAutosize bind:value={newItem} maxRows="10" shiftToNL={true} on:enter={addItem} />
    </div>
    <div>
        <button type="button" on:click={startRecording}>🎙</button>
        <button type="button" on:click={clipboardPaste}>📋</button>
        <button>Add</button>
    </div>
</form>



<style>
.idea-input {
    border: 1px solid lightblue;
}
</style>
