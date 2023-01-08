import { StoreModule } from "@ngrx/store/src";
import { loadingReducer } from "./loading/loading.reducers";
import { Store, select } from '@ngrx/store';

export const AppStoreModule = [
    //StoreModule.forRoot([]),
    //StoreModule.forFeature("loading", loadingReducer)
]