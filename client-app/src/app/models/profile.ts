import { IUser } from "./user";

export interface IProfile {
    username: string;
    displayName: string;
    image?: string;
    bio?: string;
}

export class IProfile implements IProfile{
    constructor(user: IUser){
        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;
    }
}