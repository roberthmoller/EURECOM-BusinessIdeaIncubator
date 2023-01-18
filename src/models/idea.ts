import type {Timestamp} from "firebase/firestore";
import moment from "moment/moment";

export interface Idea {
    readonly title: string
    readonly description: string
    readonly author: string
    readonly voteCount: number
    readonly commentCount: number
    readonly createdAt: Date
    readonly attachments: string[]

}

export class NewIdea implements Idea {
    public readonly title: string
    public readonly description: string
    public readonly author: string

    public readonly voteCount: number
    public readonly commentCount: number
    public readonly createdAt: Date
    public readonly attachments: string[]

    constructor(title: string, description: string, author: string, attachments: string[] = []) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.voteCount = 0;
        this.commentCount = 0;
        this.createdAt = moment().toDate();
        this.attachments = attachments;
    }
}


export class SavedIdea implements Idea {
    public readonly id: string
    public readonly title: string
    public readonly description: string
    public readonly author: string
    public readonly voteCount: number
    public readonly commentCount: number
    public readonly createdAt: Date
    public readonly attachments: string[]


    constructor(id: string,
                title: string,
                description: string,
                author: string,
                voteCount: number,
                commentCount: number,
                createdAt: Timestamp,
                attachments: string[]) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.author = author;
        this.voteCount = voteCount;
        this.commentCount = commentCount;
        this.createdAt = moment(createdAt.toDate()).toDate();
        this.attachments = attachments;
    }
}


export const ideaConverter = {
    toFirestore: (idea: Idea) => ({
        title: idea.title,
        description: idea.description,
        author: idea.author,
        voteCount: idea.voteCount,
        commentCount: idea.commentCount,
        createdAt: idea.createdAt,
        attachments: idea.attachments,
    }),
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options)
        return new SavedIdea(
            snapshot.id,
            data.title,
            data.description,
            data.author,
            data.voteCount,
            data.commentCount,
            data.createdAt,
            data.attachments,
        )
    }
}
