import { useAtomValue, useSetAtom } from "jotai";
import { userAtom, setUserAtom, onlineAtom } from "../jotai/user";
import { auth, provider } from "../lib/firebase/init";
import { signInWithRedirect } from "firebase/auth";
import { useEffect, useState } from "react";
import { useUserExistsLazyQuery } from "../generated/generated.graphql";
import { useCreateUserMutation } from "../generated/generated.graphql";

export default function useAuth() {
  const user = useAtomValue(userAtom);
  const setUser = useSetAtom(setUserAtom);
  const [loading, setLoading] = useState(true);
  const [userRegistered] = useUserExistsLazyQuery();
  const online = useAtomValue(onlineAtom)
  const [register] = useCreateUserMutation();

  function login() {
    signInWithRedirect(auth, provider)
    .then(() => {
      setLoading(false);
    }).catch((error) => {
      setUser(null);
      console.error(error);
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

  async function registerUser(email: string | null) {
    if (!online) return;
    if (!email) throw new Error("Email is null on registerUser probably because the login of firebase failed");

    const { data } = await userRegistered({ variables: { email } });
    if (!data?.exists) {
      try {
        await register({ variables: { email } });
      } catch (e) {
        console.error(e);
      }
    }
  }

  useEffect(() => {
    if (user) {
      return setLoading(false);
    }
    const unsubscribe = auth.onAuthStateChanged((fireUser) => {
      if (fireUser) {
        const { uid, displayName, photoURL } = fireUser;
        setUser({ id: uid, name: displayName, photoURL });
        setLoading(false);
        void registerUser(fireUser.email);
      }
      setLoading(false);
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, loading, login, logout };
}