import {combineSlices, configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./user/slice";
import {
    useDispatch as dispatchHook,
    useSelector as selectorHook,
} from "react-redux";

const rootReducer = combineSlices(userSlice);

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

