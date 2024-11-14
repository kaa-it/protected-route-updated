import {combineSlices, configureStore} from "@reduxjs/toolkit";
import { userSlice } from "./user";

const rootReducer = combineSlices(userSlice);

export const store = configureStore({
    reducer: rootReducer,
});
