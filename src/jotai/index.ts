import { atom } from "jotai";

export * from './user';
export * from './notes';
export * from './projects';
export const loadingAtom = atom(true);

export const loadingOnlineQuery = atom(false);