import { writable } from 'svelte/store';

export const draggingType = writable("");
export const draggingData = writable("");
export const draggingParentEl = writable();
