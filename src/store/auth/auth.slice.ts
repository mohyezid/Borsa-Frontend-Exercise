import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "./auth.types";
import { LoginData } from "../../type/interfaces";
import { UserState } from "../user/user.types";

const local_data = localStorage.getItem("auth");

const initialState: IAuthState = {
  user: local_data ? JSON.parse(local_data) : null,
  isLoading: false,
  error: null,
  isLoggedIn: local_data ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    loginStart: (state, _action: PayloadAction<LoginData>) => {
      state.user = null;
      state.error = null;
      state.isLoading = true;
    },

    loginSuccess: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
      state.error = null;
      state.isLoggedIn = true;
      state.isLoading = false;
      localStorage.setItem("auth", JSON.stringify(action.payload));
    },

    loginError: (state, action: PayloadAction<any>) => {
      state.user = null;
      state.error = action.payload;
      state.isLoggedIn = false;
      state.isLoading = false;
    },

    logout: (state) => {
      state.user = null;
      state.error = null;
      state.isLoading = false;
      state.isLoggedIn = false;
      localStorage.removeItem("auth");
    },

    updateUser: (state, action: PayloadAction<UserState>) => {
      state.isLoading = false;
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("auth", JSON.stringify(state.user));
    },
  },
});

export const { loginStart, loginSuccess, loginError, logout, updateUser } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
