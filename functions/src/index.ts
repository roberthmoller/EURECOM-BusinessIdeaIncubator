import * as functions from "firebase-functions";
import {initializeApp} from "firebase/app";
import {doc, getFirestore, runTransaction} from "firebase/firestore";

const app = initializeApp({
    apiKey: "AIzaSyCMkl2EU6pmsO5evV0gBndboiBQwXj4htI",
    authDomain: "business-idea-incubator.firebaseapp.com",
    projectId: "business-idea-incubator",
    storageBucket: "business-idea-incubator.appspot.com",
    messagingSenderId: "773586795711",
    appId: "1:773586795711:web:e33ba0e1de9aa76d4ada0a",
    measurementId: "G-6H655QHTJJ",
});

const db = getFirestore(app);
/* Comments */
const commentCollection = functions.firestore
    .document("ideas/{ideaId}/comments/{commentId}");
export const onCommentCreate = commentCollection.onCreate(
    async (change, context) => {
        try {
            const ideaId = context.params.ideaId;
            const ideaRef = doc(db, "ideas", ideaId);

            await runTransaction(db, async (transaction) => {
                const idea = await transaction.get(ideaRef);
                if (!idea.exists()) {
                    throw Error("Document does not exist!");
                }
                transaction.update(ideaRef, {
                    commentCount: idea.data().commentCount + 1,
                });
            });
        } catch (e) {
            console.error(e);
        }
    });


export const onCommentDelete = commentCollection.onDelete(
    async (change, context) => {
        try {
            const ideaId = context.params.ideaId;
            const ideaRef = doc(db, "ideas", ideaId);

            await runTransaction(db, async (transaction) => {
                const idea = await transaction.get(ideaRef);
                if (!idea.exists()) {
                    throw Error("Document does not exist!");
                }
                const commentCount = idea.data().commentCount;
                transaction.update(ideaRef, {
                    commentCount: commentCount == 0 ? 0 : commentCount - 1,
                });
            });
        } catch (e) {
            console.error(e);
        }
    });

/* Votes */

const voteCollection = functions.firestore
    .document("ideas/{ideaId}/votes/{commentId}");
export const onVoteCreate = voteCollection.onCreate(
    async (change, context) => {
        try {
            const ideaId = context.params.ideaId;
            const ideaRef = doc(db, "ideas", ideaId);

            await runTransaction(db, async (transaction) => {
                const idea = await transaction.get(ideaRef);
                if (!idea.exists()) {
                    throw Error("Document does not exist!");
                }

                const upvote = change.data().upvote;
                transaction.update(ideaRef, {
                    voteCount: idea.data().voteCount + upvote ? 1 : -1,
                });
            });
        } catch (e) {
            console.error(e);
        }
    });

export const onVoteChange = voteCollection.onUpdate(
    async (change, context) => {
        try {
            const ideaId = context.params.ideaId;
            const ideaRef = doc(db, "ideas", ideaId);

            await runTransaction(db, async (transaction) => {
                const idea = await transaction.get(ideaRef);
                if (!idea.exists()) {
                    throw Error("Document does not exist!");
                }

                const upvote = change.after.data().upvote;
                transaction.update(ideaRef, {
                    voteCount: idea.data().voteCount + upvote ? 1 : -1,
                });
            });
        } catch (e) {
            console.error(e);
        }
    });


export const onVoteDelete = voteCollection.onDelete(
    async (change, context) => {
        try {
            const ideaId = context.params.ideaId;
            const ideaRef = doc(db, "ideas", ideaId);

            await runTransaction(db, async (transaction) => {
                const idea = await transaction.get(ideaRef);
                if (!idea.exists()) {
                    throw Error("Document does not exist!");
                }
                const voteCount = idea.data().voteCount;
                transaction.update(ideaRef, {
                    voteCount: voteCount == 0 ? 0 : voteCount - 1,
                });
            });
        } catch (e) {
            console.error(e);
        }
    });
