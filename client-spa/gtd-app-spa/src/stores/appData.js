import { writable } from 'svelte/store';

function getElById(arr, elId) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].id == elId) {
			return arr[i];
		}
	}
}

function createInbox() {
	const { subscribe, set, update } = writable([]);

	return {
		subscribe,
		set,
		addIdea: (idea) => update( (inboxArr) => {
			inboxArr.unshift(idea);
			return inboxArr = inboxArr;
		} ),
		removeIdeaByIndex: (ideaIx) => update( (inboxArr) => {
			inboxArr.splice(ideaIx, 1);
			return inboxArr = inboxArr;
		} ),
		removeIdeaById: (ideaId) => update( (inboxArr) => {

			for (let i = 0; i < inboxArr.length; i++) {
				if (inboxArr[i].id == ideaId) {
					inboxArr.splice(i, 1);
					break;
				}
			}

			return inboxArr = inboxArr;
		} ),
	};
}

function createNest() {
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
		parent: Incubator // FK
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
		parent: Incubator|Project|Actionable // FK
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

	const { subscribe, set, update } = writable([
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
	]);

	return {
		subscribe,
		set,
		addTask: (incubatorIx, projectIx = "unset", newTask) => update( (nestArr) => {
			if (projectIx == "unset") {
				nestArr[incubatorIx].content.push(newTask);
			} else {
				nestArr[incubatorIx].content[projectIx].content.push(newTask);
			}
			return nestArr = nestArr;
		} ),
	};
}

export const inbox = createInbox();
export const nest = createNest();
