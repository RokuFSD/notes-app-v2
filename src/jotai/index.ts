import { atom, createStore } from "jotai";

export const appStore = createStore();

export const loadingAtom = atom(true);