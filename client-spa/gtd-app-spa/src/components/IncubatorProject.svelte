<script>
    import Sortable from "sortablejs";
    import { onMount, createEventDispatcher } from "svelte";
    import { slide } from "svelte/transition";

    import {
        draggingType,
        draggingData,
        draggingParentEl,
    } from "../stores/dragging";

    const dispatch = createEventDispatcher();

    onMount(async () => {
        setUpSortable();
    });

    export let projectData;

    let projectContentEl;
    const acceptPut = ["inbox", "incubator", "incubatorProject"];
    let isHover = false;

    $: !projectContentEl || setUpSortable();
    function setUpSortable() {
        if (!projectContentEl) return;

        Sortable.create(projectContentEl, {
            group: {
                name: "incubatorProject",
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
                draggingType.update((t) => "task");
                draggingData.update((d) => projectData.content[e.oldIndex]);
                draggingParentEl.update((p) => projectContentEl);
            },
            onEnd: (e) => {
                isHover = false;
                draggingType.update((t) => "");
                draggingData.update((d) => "");
                draggingParentEl.update((p) => undefined);
            },
            onDragIn: (e) => {
                isHover = true;
            },
            onDragOut: (e) => {
                isHover = false;
            },
            onDrop: (e) => {
                isHover = false;
            },
            onAdd: (e) => {
                const wasHover = isHover;
                isHover = false;

                if (idExist($draggingData.id, projectData.content)) return;

                if ($draggingData.type == "project") return;

                if (
                    acceptPut.includes(e.fromSortable.options.group.name) &&
                    $draggingType == "task" &&
                    wasHover
                ) {
                    projectData.content.splice(e.newIndex, 0, $draggingData);
                    $draggingParentEl.dispatchEvent(
                        new CustomEvent("removeItem", { detail: e.oldIndex })
                    );
                    updateAndTell();
                }

                if (
                    wasHover &&
                    acceptPut.includes(e.fromSortable.options.group.name) &&
                    $draggingType == "idea"
                ) {
                    dispatch("inbox-to-project", {
                        incubator: "...",
                        project: projectData.id,
                        idea: $draggingData,
                    });
                    /* $draggingParentEl.dispatchEvent( new CustomEvent('removeItem', { detail: e.oldIndex }) );
                    addItem(e, {
                        type: "task",
                        id: $draggingData.id,
                        text: $draggingData.text,
                        tags: ["e", "n"],
                        deadline: "Date",
                        time: "Int",
                        cost: "Int",
                        after: "Task"
                    } ); */
                }
            },
        });

        projectContentEl.addEventListener("removeItem", (e) => {
            removeItem(e.detail);
        });
    }

    function handleContainerChange(ev) {
        const oldLi = projectData.content[ev.oldIndex];
        projectData.content.splice(ev.oldIndex, 1);
        projectData.content.splice(ev.newIndex, 0, oldLi);
        updateAndTell();
    }

    function addItem(e, dataObj) {
        projectData.content.splice(e.newIndex, 0, dataObj);
        updateAndTell();
    }

    function removeItem(ix) {
        projectData.content.splice(ix, 1);
        updateAndTell();
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
        projectData.content = projectData.content;
        dispatch("update");
    }
</script>

<div class="idea">
    <b
        on:click={() => {
            projectData._isOpen = !projectData._isOpen;
        }}>{projectData.name}</b
    >
    {#if projectData._isOpen}
        <div transition:slide|local={{ duration: 200 }}>
            <div
                bind:this={projectContentEl}
                class="container"
                class:closed={!projectData._isOpen}
                class:drop-here={$draggingType == "task"}
                class:is-hover={isHover}
            >
                {#each projectData.content as projectTask (projectTask.id)}
                    <div class="idea">{projectTask.text}</div>
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    /* .container { */
    /* padding: 0.5em; */
    /* transition: height 0.2s; */
    /* min-height: 1em; */
    /* } */

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

    .closed {
        height: 0;
    }

    .drop-here {
        background-color: greenyellow;
    }

    .is-hover {
        border: 2px solid red;
    }
</style>
