import moment from "moment";

export interface Vote {
    readonly upvote: boolean
    readonly author: string
    readonly createdAt: Date

}

export class NewVote implements Vote {
    readonly upvote: boolean
    readonly author: string
    readonly createdAt: Date


    constructor(upvote: boolean, author: string) {
        this.upvote = upvote;
        this.author = author;
        this.createdAt = moment().toDate();
    }
}


export class SavedVote implements Vote {
    readonly id: string
    readonly upvote: boolean
    readonly author: string
    readonly createdAt: Date


    constructor(id: string, upvote: boolean, author: string, createdAt: Date) {
        this.id = id;
        this.upvote = upvote;
        this.author = author;
        this.createdAt = createdAt;
    }
}


export const voteConverter = {
    toFirestore: (idea: Vote) => ({
        upvote: idea.upvote,
        author: idea.author,
        createdAt: idea.createdAt,
    }),
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options)
        return new SavedVote(
            snapshot.id,
            data.upvote,
            data.author,
            data.createdAt,
        )
    }
}
