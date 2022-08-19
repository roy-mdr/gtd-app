import { writable } from 'svelte/store';

export const draggingEl = writable(/* DOM element */);
export const overEl = writable(/* DOM element */);
export const enterEl = writable(/* DOM element */);
export const draggingType = writable("");
export const draggingData = writable("");
