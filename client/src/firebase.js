import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAnQrm2kmfenbR3GjRXDpFEbImo-QXH1XU",
    authDomain: "clone-5f23b.firebaseapp.com",
    projectId: "clone-5f23b",
    storageBucket: "clone-5f23b.appspot.com",
    messagingSenderId: "517174847338",
    appId: "1:517174847338:web:de4bc68a15f3451850e713"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
