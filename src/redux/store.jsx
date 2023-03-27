import { configureStore } from "@reduxjs/toolkit";
import { indexApi } from "./api/indexApi";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [indexApi.reducerPath]: indexApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([indexApi.middleware]),
});
