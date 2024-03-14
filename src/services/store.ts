import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./user";
import {
    useDispatch as dispatchHook,
    useSelector as selectorHook,
    TypedUseSelectorHook
} from "react-redux";

const rootReducer = combineReducers({
    user: userReducer,
})

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

