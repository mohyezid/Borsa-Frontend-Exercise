import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserState, UserState } from "./user.types";

const initialState: IUserState = {
  data: [],
  total: 0,
  isLoading: false,
  error: null,
  page: 0,
  limit: 20,
};

const userSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    usersFetchStart: (
      state,
      _action: PayloadAction<{ page: number; limit: number }>
    ) => {
      state.error = null;
      state.isLoading = true;
    },

    usersFetchSuccess: (
      state,
      action: PayloadAction<{ data: UserState[]; total: number }>
    ) => {
      state.error = null;
      state.isLoading = false;
      state.total = action.payload.total;
      state.data.push(...action.payload.data);
      state.page = state.page + 1;
    },

    usersFetchError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    removeUsers: (_state) => {
      _state = { ...initialState };
    },
  },
});

export const {
  usersFetchStart,
  usersFetchSuccess,
  usersFetchError,
  removeUsers,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
