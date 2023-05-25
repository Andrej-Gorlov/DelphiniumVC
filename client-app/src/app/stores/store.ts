import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";

interface IStore{
    activityStore: ActivityStore;
    commonStore: CommonStore;
}

export const store: IStore={
    activityStore: new ActivityStore(),
    commonStore: new CommonStore()
};

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}