import { writable } from 'svelte/store';

export const draggingEl = writable(/* DOM element */);
export const draggingType = writable("");
export const draggingData = writable("");
export const touchPos = writable({x: 0, y: 0});
export const overElement = writable(/* DOM element */);
