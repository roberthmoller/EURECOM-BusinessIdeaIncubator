import {initializeApp} from '@firebase/app'
import {getAnalytics} from "firebase/analytics";
import {getPerformance} from "firebase/performance";
import {getStorage} from "firebase/storage";

import {collection, getFirestore, limit, orderBy, query} from '@firebase/firestore'
import {getAuth} from '@firebase/auth'
import type {Idea} from "@/models/idea";
import {ideaConverter} from "@/models/idea";
import type {Profile} from "@/models/profile";
import {profileConverter} from "@/models/profile";

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
export const analytics = getAnalytics(firebaseApp);
export const perf = getPerformance(firebaseApp);
export const storage = getStorage(firebaseApp);
// const functions = getFunctions(firebaseApp);
// here we can export reusable database references
export let profilesRef = collection(db, 'profiles').withConverter<Profile>(profileConverter);
export let ideasRef = collection(db, 'ideas').withConverter<Idea>(ideaConverter);
export const top10VotedIdeasRef = query(ideasRef,
    orderBy('voteCount', 'desc'),
    orderBy('createdAt', 'desc'),
    limit(10));
export const tenMostDiscussedIdeasRef = query(ideasRef,
    orderBy('commentCount', 'desc'),
    orderBy('createdAt', 'desc'),
    limit(10));
