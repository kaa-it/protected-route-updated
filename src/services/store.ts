import {combineSlices, configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {authSlice, TAuthActions} from "./auth/slice.ts";
import {
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from "react-redux";

const rootReducer = combineSlices(authSlice);

export const store = configureStore({
    reducer: rootReducer,
})

type TAppActions = TAuthActions;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TAppActions>;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
