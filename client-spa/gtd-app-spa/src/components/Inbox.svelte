<script>
    import Sortable from 'sortablejs';
    import { onMount } from "svelte";

    import Idea from "./Idea.svelte"

    onMount(async () => {
        setUpSortable();
        setUpSortableNative();
    });

    let inboxEl, dropZoneEl;

    let newItem = "";
    let myList = [];

    let panelito;
    let allowDropPannel = false;
    let dropPannelIsOpen = false;

    function setUpSortable() {
        Sortable.create(inboxEl, {
            group: {
                name: 'inbox'
            },
            animation: 200,
            delay: 200,
            delayOnTouchOnly: true,
            invertSwap: true,
            // forceFallback: true,
            onSort: (e) => handleContainerChange(e),
            onStart: (e) => { allowDropPannel = true; },
            onEnd: (e) => { allowDropPannel = false; dropPannelIsOpen = false; },
        });
    };

    function setUpSortableNative() {
        
        // For native drag&drop
        {
            dropZoneEl.addEventListener('dragover', function(evt) {
                evt.preventDefault();
            });

            dropZoneEl.addEventListener('dragenter', function(evt) {
                if (allowDropPannel && !dropZoneEl.contains(evt.relatedTarget)) {
                    openDropPannel(evt);
                }
            });

            dropZoneEl.addEventListener('dragleave', function(evt) {
                if (allowDropPannel && !dropZoneEl.contains(evt.relatedTarget)) {

                }
            });
        }


        // For fallback
        {
            dropZoneEl.addEventListener('mouseenter', function(evt) {
                if (allowDropPannel) {
                    openDropPannel(evt);
                }
            });

            dropZoneEl.addEventListener('mouseleave', function(evt) {
                if (allowDropPannel) {
                    
                }
            });
        }

        // to make Sortable.js trigger ondragstart/ondragover on touch devices
        {
            inboxEl.addEventListener('touchmove', function(evt) {
                // from: https://stackoverflow.com/questions/54917268/ondragover-equivalent-in-vue-draggable-sortable-js
                if (!allowDropPannel) return;
                if (dropPannelIsOpen) return;
                let x = evt.touches[0].clientX;
                let y = evt.touches[0].clientY;
                let elementAtTouchPoint = document.elementFromPoint(x, y);
                if (elementAtTouchPoint === dropZoneEl ||
                    elementAtTouchPoint.parentNode === dropZoneEl  // In case of a ghost element, the element at touch point  is the ghost element and thus we need to check if the parent of the ghost element is the dropZoneEl.
                ) {
                    // dragover
                    openDropPannel(evt);
                } else {
                    // dragleave
                }
            });
        }
    }

    function handleContainerChange(ev) {
        const oldLi = myList[ev.oldIndex];		
        myList.splice(ev.oldIndex, 1);
        myList.splice(ev.newIndex, 0, oldLi);
        myList = myList;
    }

    function addItem(ev) {

        if (newItem == "") return;

        const newListItem = {
            name: newItem,
            id: Math.random()
        }

        myList.unshift(newListItem);
        myList = myList;
        newItem = "";
    }

    function removeItem(ix) {
        myList.splice(ix, 1);
        myList = myList;
    }


    function openDropPannel(ev) {
        if (!allowDropPannel) return;
        if (dropPannelIsOpen) return;

        dropPannelIsOpen = true;

        if (ev.type == "touchmove") {
            panelito.style.left = ( ev.touches[0].clientX - ev.touches[0].radiusX ) + 'px';
            panelito.style.top  = ( ev.touches[0].clientY - ev.touches[0].radiusY ) + 'px';
        }
        if (ev.type == "dragenter" || ev.type == "mouseenter") {
            panelito.style.left = ev.clientX + 'px';
            panelito.style.top  = ev.clientY + 'px';
        }

    }

</script>



<div class="inbox">

    <span>Inbox</span>

    <form on:submit|preventDefault={addItem}>
        <input type="text" bind:value={newItem}>
        <button>Add</button>
    </form>

    <hr>

    <div class="container" bind:this={inboxEl}>
        {#each myList as listItem, i (listItem.id)}
        <Idea idea={listItem} on:remove={() => removeItem(i)} />
        {/each}
    </div>

    <hr>

    <div bind:this={dropZoneEl} class="drop-zone"  >
        DROP ZONE (TO SYSTEM)
    </div>

    <div class="panelito" bind:this={panelito} class:off={!dropPannelIsOpen}>
        QUICK | CALENDAR | TICKLER | NEST | NOTES | HELP
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

.container {
    overflow: auto;
    padding: 0.5em;
}

.drop-zone {
    background-color: lightgray;
    padding: 2em;
}

.panelito {
    position: absolute;
    z-index: 100;
    padding: 1em;
    margin: 1em;
    background-color: indianred;
}

.off {
    display: none;
}
</style>