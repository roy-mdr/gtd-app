<script>
    import Sortable from 'sortablejs';
    import { onMount, createEventDispatcher } from "svelte";
    import IncubatorProject from './IncubatorProject.svelte';

    import { draggingType, draggingData, draggingParentEl } from '../stores/dragging';

    const dispatch = createEventDispatcher();

    onMount(async () => {
        setUpSortable();
    });

    export let incubatorData;

    let incubatorContentEl;
    const acceptPut = ["inbox", "incubator", "incubatorProject"];
    let isHover = false;

    function setUpSortable() {
        Sortable.create(incubatorContentEl, {
            group: {
                name: 'incubator',
                put: acceptPut,
                // pull: false
            },
            revertDOM: true,
            animation: 200,
            delay: 200,
            delayOnTouchOnly: true,
            invertSwap: true,
            swapThreshold: 0.25,
            // fallbackOnBody: true,
            // forceFallback: true,
            onSort: (e) => handleContainerChange(e),
            onStart: (e) => {
                draggingType.update( (t) => "task" );
                draggingData.update( (d) => incubatorData.content[e.oldIndex] );
                draggingParentEl.update( (p) => incubatorContentEl );
            },
            onEnd: (e) => {
                isHover = false;
                draggingType.update( (t) => "" );
                draggingData.update( (d) => "" );
                draggingParentEl.update( (p) => undefined );
            },
            onDragIn:  (e) => { isHover = true },
            onDragOut: (e) => { isHover = false },
            onDrop: (e) => { isHover = false },
            onAdd: (e) => {
                const wasHover = isHover;
                isHover = false;

                if ( idExist($draggingData.id, incubatorData.content) ) return;

                if ( wasHover && acceptPut.includes(e.fromSortable.options.group.name) && $draggingType == "task" ) {
                    incubatorData.content.splice(e.newIndex, 0, $draggingData);
                    $draggingParentEl.dispatchEvent( new CustomEvent('removeItem', { detail: e.oldIndex }) );
                    dispatch('update');
                }

                if ( wasHover && acceptPut.includes(e.fromSortable.options.group.name) &&  $draggingType == "idea" ) {
                    $draggingParentEl.dispatchEvent( new CustomEvent('removeItem', { detail: e.oldIndex }) );
                    addItem(e, {
                        type: "task",
                        id: $draggingData.id,
                        text: $draggingData.text,
                        tags: ["p", "o"],
                        deadline: "Date",
                        time: "Int",
                        cost: "Int",
                        after: "Task"
                    } );
                }
            }
        });

        incubatorContentEl.addEventListener('removeItem', (e) => {
            removeItem(e.detail);
        })
    };

    function handleContainerChange(ev) {
        const oldLi = incubatorData.content[ev.oldIndex];		
        incubatorData.content.splice(ev.oldIndex, 1);
        incubatorData.content.splice(ev.newIndex, 0, oldLi);
        dispatch('update');
    }

    function addItem(e, dataObj) {
        incubatorData.content.splice(e.newIndex, 0, dataObj);
        dispatch('update');
    }

    function removeItem(ix) {
        incubatorData.content.splice(ix, 1);
        dispatch('update');
    }

    function idExist(id, list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                alert("Item already in list!");
                return true;
            }
        }
        return false;
    }

function updateAndTell() {
    incubatorData.content = incubatorData.content;
    dispatch('update');
}

</script>



<div class="incubadora idea" style="border-color: {incubatorData.color};">
    <b>{incubatorData.name}</b>
    <div bind:this={incubatorContentEl} class="container">
        {#each incubatorData.content as incubatorItem (incubatorItem.id)}
            {#if incubatorItem.type == "task"}
            <div class="idea">{incubatorItem.text}</div>
            {:else if incubatorItem.type == "project"}
            <IncubatorProject projectData={incubatorItem} on:update={updateAndTell} />
            {/if}
        {/each}
    </div>
</div>



<style>
    .incubadora {
        margin: 0.5em;
        padding: 0.5em;
        height: max-content;
    }

    .container {
        padding: 0.5em;
    }

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
        padding: 0.5em;
    }

    .idea:hover {
        box-shadow: 0px 5px 10px 0 rgb(0 0 0 / 10%);
    }
</style>