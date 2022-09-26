<script>
    /*

    // IN DATABASE:

    interface Incubator: {
        _id: Id, // PK
        name: String,
        color: String,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date,
    }

    interface Project: {
        _id: Id, // PK
        name: String,
        deadline: Date,
        description: String,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date,
        _isOpen: Bool,
    }

    interface Task: {
        _id: Id, // PK
        text: String,
        parent: Project|Incubator // FK
        tags: Tags[],
        deadline: Date,
        time: Int,
        cost: Int,
        after: Task, // FK
        createdAt: Date,
        updatedAt: Date,
        completedAt: Date,
        deletedAt: Date,
    }



    // IN APP:

    interface Nest: [
        {
            type: "incubator",
            id: "xxxx",
            name: "asdf",
            color: "#FFEE00",
            content: [
                {
                    type: "task",
                    id: "xxx",
                    text: "asdf",
                    tags: ["a", "b"],
                    deadline: Date,
                    time: Int,
                    cost: Int,
                    after: Task // FK
                },
                {
                    type: "project",
                    id: "xxx",
                    name: "asdf",
                    deadline: Date,
                    description: String,
                    _isOpen: Bool,
                    content: [
                        {
                            type: "task",
                            id: "xxx",
                            text: "asdf",
                            tags: ["a", "b"],
                            deadline: Date,
                            time: Int,
                            cost: Int,
                            after: Task // FK
                        },
                    ]
                }
            ]
        }
    ];

    */

    import Sortable from 'sortablejs';
    import { onMount } from "svelte";
    import IncubatorNew from './IncubatorNew.svelte';
    import Incubator from './Incubator.svelte';

    onMount(async () => {
        setUpSortable();
    });

    let nestContentEl;
    let isHover = false;

    function setUpSortable() {
        Sortable.create(nestContentEl, {
            group: {
                name: 'nest',
                put: false,
                pull: false
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
            onStart: (e) => {},
            onEnd: (e) => {},
            onDragIn:  (e) => { isHover = true },
            onDragOut: (e) => { isHover = false },
            onAdd: (e) => {},
        });
    };

    function handleContainerChange(ev) {
        const oldLi = myNest[ev.oldIndex];
        myNest.splice(ev.oldIndex, 1);
        myNest.splice(ev.newIndex, 0, oldLi);
        myNest = myNest;
    }

    let myNest = [
        {
            type: "incubator",
            id: "inc_xxxx",
            name: "inc 1",
            color: "blue",
            content: [
                {
                    type: "task",
                    id: "task_xxx",
                    text: "tast 1111",
                    tags: ["a", "b"],
                    deadline: "Date",
                    time: "Int",
                    cost: "Int",
                    after: "Task"
                },
                {
                    type: "project",
                    id: "proj_xxx",
                    name: "project 222",
                    deadline: "Date",
                    description: "String",
                    _isOpen: true,
                    content: [
                        {
                            type: "task",
                            id: "task_aaa",
                            text: "task 333",
                            tags: ["a", "b"],
                            deadline: "Date",
                            time: "Int",
                            cost: "Int",
                            after: "Task"
                        },
                    ]
                }
            ]
        },
        {
            type: "incubator",
            id: "inc_yyy",
            name: "inc 2",
            color: "#FFEE00",
            content: [
                {
                    type: "task",
                    id: "task_yyy",
                    text: "task 444",
                    tags: ["a", "b"],
                    deadline: "Date",
                    time: "Int",
                    cost: "Int",
                    after: "Task"
                },
                {
                    type: "project",
                    id: "proj_yyy",
                    name: "project 555",
                    deadline: "Date",
                    description: "String",
                    _isOpen: true,
                    content: [
                        {
                            type: "task",
                            id: "task_bbb",
                            text: "task 666",
                            tags: ["a", "b"],
                            deadline: "Date",
                            time: "Int",
                            cost: "Int",
                            after: "Task"
                        },
                        {
                            type: "task",
                            id: "task_ooo",
                            text: "taskergds",
                            tags: ["a", "b"],
                            deadline: "Date",
                            time: "Int",
                            cost: "Int",
                            after: "Task"
                        },
                    ]
                }
            ]
        }
    ];

</script>



<div class="app-section nest">
    NEST
    <IncubatorNew />
    <button>Expand</button>
    <div bind:this={nestContentEl} class="container">
        {#each myNest as incubator, nestIndex (incubator.id)}
            <Incubator
            incubatorData={incubator}
            on:update={() => {myNest = myNest}}
            />
        {/each}
    </div>
</div>
<!-- <div style="z-index: 100;">
    <pre><code>{JSON.stringify(myNest, null, 2)}</code></pre>
</div> -->



<style>
    .nest {
        grid-area: nest;

        /* display: flex; */
    }

    .container {
        display: flex;
    }
</style>