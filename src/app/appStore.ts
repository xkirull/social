import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import { baseApi } from "shared/api";
import storage from 'redux-persist/lib/storage';
import { sessionSlice } from "entities/session";
import { rootReducer } from "./rootReducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [sessionSlice.name],
}

export function makeStore() {
    const store = configureStore({

        reducer: persistReducer(
            persistConfig,
            rootReducer
        ) as unknown as typeof rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }).concat(baseApi.middleware),
    })

    setupListeners(store.dispatch)

    return store
}

export const appStore = makeStore();
