import type { User } from "@/entities/user.entity";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state: AuthState) => {
      state.user = null;
    }
  }
});

export const AuthReducer = AuthSlice.reducer;
export const AuthActions = AuthSlice.actions;
