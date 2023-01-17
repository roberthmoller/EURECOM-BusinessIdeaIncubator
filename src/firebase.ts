import {initializeApp} from '@firebase/app'
// import {getAnalytics} from "firebase/analytics";
import {collection, getFirestore, limit, orderBy, query} from '@firebase/firestore'
import {getAuth} from '@firebase/auth'
import type {Idea} from "@/models/idea";
import {ideaConverter} from "@/models/idea";

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyCMkl2EU6pmsO5evV0gBndboiBQwXj4htI",
    authDomain: "business-idea-incubator.firebaseapp.com",
    projectId: "business-idea-incubator",
    storageBucket: "business-idea-incubator.appspot.com",
    messagingSenderId: "773586795711",
    appId: "1:773586795711:web:e33ba0e1de9aa76d4ada0a",
    measurementId: "G-6H655QHTJJ",
})


// used for the firestore refs
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
// const analytics = getAnalytics(firebaseApp);

// here we can export reusable database references
export let ideasRef = collection(db, 'ideas').withConverter<Idea>(ideaConverter);
export const topVotedIdeasRef = query(ideasRef,
    orderBy('voteCount', 'desc'),
    orderBy('createdAt', 'desc'),
    limit(10));
export const mostDiscussedIdeasRef = query(ideasRef,
    orderBy('commentCount', 'desc'),
    orderBy('createdAt', 'desc'),
    limit(10));
