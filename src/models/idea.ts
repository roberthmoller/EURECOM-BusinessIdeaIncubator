export interface Idea {
    readonly title: string
    readonly description: string
    readonly voteCount: number
    readonly commentCount: number
    readonly createdAt: Date

}

export class NewIdea implements Idea {
    public readonly title: string
    public readonly description: string
    public readonly voteCount: number
    public readonly commentCount: number
    public readonly createdAt: Date


    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
        this.voteCount = 0;
        this.commentCount = 0;
        this.createdAt = new Date(Date.now());
    }
}


export class SavedIdea implements Idea {
    public readonly id: string
    public readonly title: string
    public readonly description: string
    public readonly voteCount: number
    public readonly commentCount: number
    public readonly createdAt: Date


    constructor(id: string, title: string, description: string, voteCount: number, commentCount: number, createdAt: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.voteCount = voteCount;
        this.commentCount = commentCount;
        this.createdAt = createdAt;
    }
}


export const ideaConverter = {
    toFirestore: (idea: Idea) => idea instanceof SavedIdea ? {
        id: idea.id,
        title: idea.title,
        description: idea.description,
        voteCount: idea.voteCount,
        commentCount: idea.commentCount,
        createdAt: idea.createdAt,

    } : {
        title: idea.title,
        description: idea.description,
        voteCount: idea.voteCount,
        commentCount: idea.commentCount,
        createdAt: idea.createdAt,
    },
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options)
        return new SavedIdea(
            snapshot.id,
            data.title,
            data.description,
            data.voteCount,
            data.commentCount,
            data.createdAt,
        )
    }
}
