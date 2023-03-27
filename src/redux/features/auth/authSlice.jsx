import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    setCredentials: (
      state,
      { payload: { id, email, token, locality, isAdmin, name } }
    ) => {
      state.user = { id, email, locality, isAdmin, name };
      state.token = token;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export default authSlice.reducer;
export const { setCredentials, clearCredentials } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;
