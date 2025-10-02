import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { userSlice } from '@services/user/slice.js';

const rootReducer = combineSlices(userSlice);

export const store = configureStore({
  reducer: rootReducer,
});
