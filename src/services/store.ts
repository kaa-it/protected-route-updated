import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./user/slice";
import {
    useDispatch as dispatchHook,
    useSelector as selectorHook,
} from "react-redux";

const rootReducer = combineReducers({
    [userSlice.reducerPath]: userSlice.reducer,
})

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

