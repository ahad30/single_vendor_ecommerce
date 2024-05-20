import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TUser = {
  id: string;
  email: string;
  name: string;
  role_name: string;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
};
const initialState: TAuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state:TAuthState, action) => {},
    logout: (state:TAuthState, action) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const useCurrentToken = (state:RootState)=> state.auth.token
export const useCurrentUser = (state:RootState)=> state.auth.user
