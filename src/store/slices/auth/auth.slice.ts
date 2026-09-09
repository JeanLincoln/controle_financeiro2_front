import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { User } from "@/entities/user.entity";

interface AuthState {
  user: User | null;
}

type UserProfileData = Pick<
  User,
  "firstName" | "lastName" | "email" | "birthDate"
>;

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
    updateUser: (state: AuthState, action: PayloadAction<UserProfileData>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload
        };
      }
    },
    logout: (state: AuthState) => {
      state.user = null;
    }
  }
});

export const AuthReducer = AuthSlice.reducer;
export const AuthActions = AuthSlice.actions;
