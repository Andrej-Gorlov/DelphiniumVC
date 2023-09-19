import { IUser } from "./user";

export interface IProfile {
    username: string;
    displayName: string;
    image?: string;
    bio?: string;
    photos?: IPhoto[]
}

export class IProfile implements IProfile{
    constructor(user: IUser){
        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;
    }
}

export interface IPhoto {
    id: string;
    url: string;
    isMain: boolean;
}