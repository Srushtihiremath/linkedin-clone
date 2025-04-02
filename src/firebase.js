// // import { initializeApp } from "firebase/app";
// // import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
// // import { getFirestore } from "firebase/firestore";
// // import { getStorage } from "firebase/storage";

// // // Firebase config
// // const firebaseConfig = {
// //     apiKey: "AIzaSyBaTVNUQtoL08WkWjWb9r8ioyDdBv7JZpk",
// //     authDomain: "linkedin-clone-d2e93.firebaseapp.com",
// //     projectId: "linkedin-clone-d2e93",
// //     storageBucket: "linkedin-clone-d2e93.appspot.com",
// //     messagingSenderId: "879122631209",
// //     appId: "1:879122631209:web:8bba12a55bdc05b4236a38",
// //     measurementId: "G-E741M8J1ZN"
// // };

// // // Initialize Firebase services
// // const app = initializeApp(firebaseConfig);
// // const auth = getAuth(app);
// // const provider = new GoogleAuthProvider();
// // const storage = getStorage(app);
// // const db = getFirestore(app);

// // // Named exports for all Firebase services
// // export { auth, provider, storage, db };
// // export { db as default };
// // // Export the signInWithGoogle function
// // export const signInWithGoogle = () => {
// //     return signInWithRedirect(auth, provider);
// // };

// // // Default export if needed
// // export default app;


// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//     apiKey: "AIzaSyBaTVNUQtoL08WkWjWb9r8ioyDdBv7JZpk",
//     authDomain: "linkedin-clone-d2e93.firebaseapp.com",
//     projectId: "linkedin-clone-d2e93",
//     storageBucket: "linkedin-clone-d2e93.appspot.com",
//     messagingSenderId: "879122631209",
//     appId: "1:879122631209:web:8bba12a55bdc05b4236a38",
//     measurementId: "G-E741M8J1ZN"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();
// const storage = getStorage(app);

// // // Export all as named exports
// // export { auth, provider, storage, signInWithPopup };
// // // export { db as default };

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBaTVNUQtoL08WkWjWb9r8ioyDdBv7JZpk",
    authDomain: "linkedin-clone-d2e93.firebaseapp.com",
    projectId: "linkedin-clone-d2e93",
    storageBucket: "linkedin-clone-d2e93.appspot.com",
    messagingSenderId: "879122631209",
    appId: "1:879122631209:web:8bba12a55bdc05b4236a38",
    measurementId: "G-E741M8J1ZN"
};

const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { auth, db, storage, provider };