import type {Timestamp} from "firebase/firestore";
import moment from "moment";

export interface Comment {
    readonly text: string
    readonly author: string
    readonly createdAt: Date
    readonly attachments: string[]

}

export class NewComment implements Comment {
    readonly text: string
    readonly author: string
    readonly createdAt: Date
    readonly attachments: string[]


    constructor(text: string, author: string, attachments: string[] = []) {
        this.text = text;
        this.author = author;
        this.attachments = attachments;
        this.createdAt = moment().toDate();
    }
}


export class SavedComment implements Comment {
    readonly id: string
    readonly text: string
    readonly author: string
    readonly createdAt: Date
    readonly attachments: string[]


    constructor(id: string, text: string, author: string, createdAt: Timestamp, attachments: string[]) {
        this.id = id;
        this.text = text;
        this.author = author;
        this.createdAt = createdAt.toDate();
        this.attachments = attachments;
    }
}


export const commentConverter = {
    toFirestore: (idea: Comment) => ({
        text: idea.text,
        author: idea.author,
        createdAt: idea.createdAt,
        attachments: idea.attachments,
    }),
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options)
        return new SavedComment(
            snapshot.id,
            data.text,
            data.author,
            data.createdAt,
            data.attachments,
        )
    }
}
