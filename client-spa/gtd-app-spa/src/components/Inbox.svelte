<script>
    import Sortable from 'sortablejs';
    import { onMount } from "svelte";

    onMount(async () => {
        setUpSortable();
    });

    let foo, bar;

    let myList = [{name:'First item', id:1}, {name:'Second item', id:2}, {name:'Third item', id:3}]

    function setUpSortable() {
        Sortable.create(foo, {
            group: {
                name: 'foo',
                // put: true,
                // pull: false,
            },
            animation: 200
        });

        Sortable.create(bar, {
            group: {
                name: 'bar',
                // put: true,
                // pull: 'clone',
            },
            animation: 200,
            invertSwap: true,
            onSort: (e) => handleContainerChange(e)
        });
    };

    function handleContainerChange(ev) {
        console.log("Container changed!", ev);
        const oldLi = myList[ev.oldIndex];		
        myList.splice(ev.oldIndex, 1);
        myList.splice(ev.newIndex, 0, oldLi);
        myList = myList;
    }
</script>



<div>
    <h3>Inbox</h3>
    <div class="container" bind:this={foo}>
        <p class="draggable" draggable="true">1</p>
        <p class="draggable" draggable="true">2</p>
    </div>
    <div class="container" bind:this={bar}>
        {#each myList as listItem, i (listItem.id)}
        <p class="draggable" draggable="true">{i}. {listItem.name}</p>
        {/each}
    </div>
</div>
<pre><code>{JSON.stringify(myList, null, 2)}</code></pre>



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