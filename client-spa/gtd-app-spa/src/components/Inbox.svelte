<script>
    import Sortable from 'sortablejs';
    import { onMount } from "svelte";

    onMount(async () => {
        setUpSortable();
    });

    let foo, bar;

    let myList1 = [{name:'1', id:1}, {name:'2', id:2}, {name:'3', id:3}]
    let myList2 = [{name:'A', id:4}, {name:'B', id:5}, {name:'C', id:6}]

    function setUpSortable() {
        Sortable.create(foo, {
            group: {
                name: 'foo',
                put: true,
                // pull: false,
            },
            revertDOM: true,
            animation: 200,
            delay: 200,
            delayOnTouchOnly: true,
            onAdd: (e) => {
                // drag from one list and drop into another

                console.log(e.toSortable)
                console.log(e.fromSortable)
                if (e.fromSortable.options.group.name == 'bar') {
                    myList1.splice(e.newIndex, 0, myList2[e.oldIndex]);
                    if (e.pullMode !== 'clone') {
                        // delete
                        myList2.splice(e.oldIndex, 1);
                    }
                    myList1 = myList1;
                    myList2 = myList2;
                }

            },
            onSort: (e) => {
                // drag & drop within the same list
                console.log("sort tabla 1 :)")
                handleContainerChange(myList1, e);
                myList1 = myList1;
            }
        });

        Sortable.create(bar, {
            group: {
                name: 'bar',
                put: true,
                pull: 'clone',
                // pull: false,
            },
            revertDOM: true,
            animation: 200,
            delay: 200,
            delayOnTouchOnly: true,
            invertSwap: true,
            swapThreshold: 0.25,
            onAdd: (e) => {
                // drag from one list and drop into another

                if (e.fromSortable.options.group.name == 'foo') {
                    myList2.splice(e.newIndex, 0, myList1[e.oldIndex]);
                    if (e.pullMode !== 'clone') {
                        // delete
                        myList1.splice(e.oldIndex, 1);
                    }
                    myList2 = myList2;
                    myList1 = myList1;
                }

            },
            onSort: (e) => {
                // drag & drop within the same list
                console.log("sort tabla 2 :)")
                handleContainerChange(myList2, e);
                myList2 = myList2;
            }
        });
    };

    function handleContainerChange(list, ev) {
        console.log("Container changed!", ev);
        const oldLi = list[ev.oldIndex];
        list.splice(ev.oldIndex, 1);
        list.splice(ev.newIndex, 0, oldLi);
    }
</script>



<div>
    <h3>Inbox</h3>
    <div class="container" bind:this={foo}>
        {#each myList1 as listItem, i (listItem.id)}
        <p class="draggable">{i}. {listItem.name}</p>
        {/each}
    </div>
    <div class="container" bind:this={bar}>
        {#each myList2 as listItem, i (listItem.id)}
        <p class="draggable">{i}. {listItem.name}</p>
        {/each}
    </div>
</div>
<pre><code>{JSON.stringify(myList1, null, 2)}</code></pre>
<pre><code>{JSON.stringify(myList2, null, 2)}</code></pre>



<style>
.container {
    background-color: #333;
    margin: 1em;
    padding: 1em;
}

.draggable {
    background-color: #999;
    padding: 1em;
    margin: 1em;
    cursor: pointer;
}

.draggable:hover {
    background-color: #FFF;
}
</style>