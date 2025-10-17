import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ShowAndHideState {
  isVisible: boolean;
  key?: string;
}

const initialState: ShowAndHideState = {
  isVisible: false
};

export const ShowAndHideSlice = createSlice({
  name: "showAndHide",
  initialState,
  reducers: {
    show: (
      state: ShowAndHideState,
      action: PayloadAction<Pick<ShowAndHideState, "key">>
    ) => {
      state.isVisible = true;
      state.key = action.payload.key;
    },
    hide: (state: ShowAndHideState) => {
      state.isVisible = false;
      state.key = undefined;
    },
    toggle: (
      state: ShowAndHideState,
      action: PayloadAction<Pick<ShowAndHideState, "key">>
    ) => {
      state.isVisible = !state.isVisible;
      state.key = action.payload.key;
    }
  }
});

export const ShowAndHideReducer = ShowAndHideSlice.reducer;
export const ShowAndHideActions = ShowAndHideSlice.actions;
