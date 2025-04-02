import firebase from "../firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; 
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./actionType";

const { auth, db, storage, provider } = firebase;

export function signInAPI() {
    return (dispatch) => {
        signInWithPopup(auth, provider)
            .then((result) => {
                dispatch(setUser(result.user));
            })
            .catch((error) => {
                console.error("Error during sign-in:", error);
                alert(error.message);
            });
    };
}

export function getUserAuth() {
    return (dispatch) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser(user));
            } else {
                dispatch(setUser(null));
            }
        });
    };
}

export function signOutAPI() {
    return (dispatch) => {
        signOut(auth)
            .then(() => {
                dispatch(setUser(null));
            })
            .catch((error) => {
                console.error(error.message);
            });
    };
}

export function postArticleAPI(payload) {
    return (dispatch) => {
        dispatch(setLoading(true));

        if (payload.image) {
            const storageRef = ref(storage, `images/${payload.image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, payload.image);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Progress: ${progress}%`);
                },
                (error) => console.error(error),
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    await addDoc(collection(db, "articles"), {
                        actor: {
                            description: payload.user.email,
                            title: payload.user.displayName,
                            image: payload.user.photoURL,
                        },
                        video: payload.video || "",
                        sharedImg: downloadURL,
                        comments: 0,
                        description: payload.description,
                        timestamp: new Date(),
                    });
                    dispatch(setLoading(false));
                }
            );
        } else if (payload.video) {
            addDoc(collection(db, "articles"), {
                actor: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: payload.timestamp,
                    image: payload.user.photoURL,
                },
                video: payload.video,
                sharedImg: "",
                comments: 0,
                description: payload.description,
                timestamp: new Date(),
            }).then(() => {
                dispatch(setLoading(false));
            });
        }
    };
}

export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
});

export const setLoading = (status) => ({
    type: SET_LOADING_STATUS,
    status: status,
});

export const getArticles = (payload) => ({
    type: GET_ARTICLES,
    payload: payload,
});

export function getArticlesAPI() {
    return (dispatch) => {
        const q = query(collection(db, "articles"), orderBy("timestamp", "desc"));
        onSnapshot(q, (snapshot) => {
            const payload = snapshot.docs.map((doc) => doc.data());
            dispatch(getArticles(payload));
        });
    };
}
