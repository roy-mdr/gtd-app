<script>
    import Sortable from 'sortablejs';
    import { onMount } from "svelte";

    import IdeaItem from "./IdeaItem.svelte";
    import TextAreaAutosize from './TextAreaAutosize.svelte';

    onMount(async () => {
        setUpSortable();
    });

    let inboxEl;

    let newItem = "";
    let myList = [];

    function setUpSortable() {
        Sortable.create(inboxEl, {
            group: {
                name: 'inbox',
                put: false
            },
            animation: 200,
            delay: 200,
            delayOnTouchOnly: true,
            invertSwap: true,
            swapThreshold: 0.25,
            onSort: (e) => handleContainerChange(e)
        });
    };

    function handleContainerChange(ev) {
        const oldLi = myList[ev.oldIndex];		
        myList.splice(ev.oldIndex, 1);
        myList.splice(ev.newIndex, 0, oldLi);
        myList = myList;
    }

    function addItem(ev) {

        if (newItem == "") return;

        const newListItem = {
            id: Math.random(),
            text: newItem,
        }

        myList.unshift(newListItem);
        myList = myList;
        newItem = "";
    }

    function removeItem(ix) {
        myList.splice(ix, 1);
        myList = myList;
    }

</script>



<div class="inbox">

    <span>Inbox</span>

    <form on:submit|preventDefault={addItem}>
        <div class="idea-input">
            <TextAreaAutosize bind:value={newItem} maxRows="10" shiftToNL={true} on:enter={addItem} />
        </div>
        <button>Add</button>
    </form>

    <hr>

    <div class="container" bind:this={inboxEl}>
        {#each myList as listItem, i (listItem.id)}
        <IdeaItem idea={listItem} on:remove={() => removeItem(i)} />
        {/each}
    </div>

</div>



<style>
.inbox {
    background-color: white;
    /* border: 1px solid lightblue; */
    border-radius: 5px;
    margin: 1em;
    box-shadow: 0px 1px 1px 0 rgb(0 0 0 / 10%);
    max-width: 200px;
}

.idea-input {
    border: 1px solid lightblue;
}

.container {
    overflow: auto;
    padding: 0.5em;
}
</style>