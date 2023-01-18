import moment from "moment";

export interface Profile {
    readonly name: string
    readonly email: string
    readonly createdAt: Date

}

export class NewProfile implements Profile {
    public readonly name: string
    public readonly email: string
    public readonly createdAt: Date


    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
        this.createdAt = moment().toDate();
    }
}


export class SavedProfile implements Profile {
    public readonly id: string
    public readonly name: string
    public readonly email: string
    public readonly createdAt: Date


    constructor(id: string,  name: string, email: string, createdAt: Date) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
    }
}
export const profileConverter = {
    toFirestore: (idea: Profile) => ({
        name: idea.name,
        email: idea.email,
        createdAt: idea.createdAt,
    }),
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options)
        return new SavedProfile(
            snapshot.id,
            data.name,
            data.email,
            data.createdAt,
        )
    }
}
