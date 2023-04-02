import { atom } from "jotai";

type User = {
  id: string;
  name: string | null;
  photoURL: string | null;
}

export const userAtom = atom<User | null>(null);

export const setUserAtom = atom(null, (get, set, user: User | null) => {
  set(userAtom, user);
});

export const onlineAtom = atom(false);