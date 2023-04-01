import { useAtomValue, useSetAtom } from "jotai";
import { userAtom, setUserAtom } from "../jotai/user";
import { auth, provider } from "../lib/firebase/init";
import { signInWithRedirect } from "firebase/auth";
import { useEffect, useState } from "react";

export default function useAuth() {
  const user = useAtomValue(userAtom);
  const setUser = useSetAtom(setUserAtom);
  const [loading, setLoading] = useState(true);

  function login() {
    signInWithRedirect(auth, provider)
    .then(() => {
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setUser(null);
    });
  }

  function logout() {
    setLoading(true);
    auth.signOut()
    .then(() => {
      setLoading(false);
      setUser(null);
    });
  }

  useEffect(() => {
    if (user) {
      return setLoading(false);
    }
    const unsubscribe = auth.onAuthStateChanged((fireUser) => {
      if (fireUser) {
        const { uid, displayName } = fireUser;
        setUser({ id: uid, name: displayName });
        setLoading(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, loading, login, logout };
}