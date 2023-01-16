import {initializeApp} from '@firebase/app'
// import {getAnalytics} from "firebase/analytics";
import {collection, getFirestore, limit, orderBy, query} from '@firebase/firestore'
import {getAuth} from '@firebase/auth'

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyCMkl2EU6pmsO5evV0gBndboiBQwXj4htI",
    authDomain: "business-idea-incubator.firebaseapp.com",
    projectId: "business-idea-incubator",
    storageBucket: "business-idea-incubator.appspot.com",
    messagingSenderId: "773586795711",
    appId: "1:773586795711:web:e33ba0e1de9aa76d4ada0a",
    measurementId: "G-6H655QHTJJ",
})

class Idea {
    readonly id: string
    readonly title: string
    readonly description: string
    readonly voteCount: number
    readonly commentCount: number


    constructor(id: string, title: string, description: string, voteCount: number, commentCount: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.voteCount = voteCount;
        this.commentCount = commentCount;
    }
}

// used for the firestore refs
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
// const analytics = getAnalytics(firebaseApp);

// here we can export reusable database references

const ideaConverter = {
    toFirestore: (idea: Idea) => ({
        title: idea.title,
        description: idea.description,
    }),
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options)
        return new Idea(snapshot.id, data.title, data.description, data.voteCount, data.commentCount)
    }
}

export const ideasRef = collection(db, 'ideas').withConverter(ideaConverter)
export const topVotedIdeasRef = query(ideasRef, orderBy('voteCount', 'desc'), limit(10))
export const mostDiscussedIdeasRef = query(ideasRef, orderBy('commentCount', 'desc'), limit(10))
