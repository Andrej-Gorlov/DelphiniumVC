import { makeAutoObservable } from "mobx";
import { IServerError } from "../models/serverError";

export default class CommonStore{
    error: IServerError | null = null;

    constructor(){
        makeAutoObservable(this);
    }

    setServerError(error: IServerError) {
        this.error = error;
    }
}