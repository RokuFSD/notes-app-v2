import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA35eHmpN-rlC5aAETP6365tEjMwIQ8gf0",
  authDomain: "fire-next-auth-b50c7.firebaseapp.com",
  projectId: "fire-next-auth-b50c7",
  storageBucket: "fire-next-auth-b50c7.appspot.com",
  messagingSenderId: "869976887213",
  appId: "1:869976887213:web:bb33cd510c9ff43fb21b24",
  measurementId: "G-H6XBQT2WY9"
};

const provider = new GoogleAuthProvider();

const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

export { auth, provider };