import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "./feature/user-slice.js";
import petReducer from "./feature/pet-slice.js";
import storage from "../utils/storage.js";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["user", "pet"],
};

const rootReducer = combineReducers({
    user: userReducer,
    pet: petReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
