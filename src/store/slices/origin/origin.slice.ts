import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface OriginState {
  type: "CREATE" | "EDIT";
  id?: string;
}

const initialState: OriginState = {
  type: "CREATE"
};

export const OriginSlice = createSlice({
  name: "origin",
  initialState,
  reducers: {
    setType: (state: OriginState, action: PayloadAction<OriginState>) => {
      state = action.payload;
    },
    reset: (state: OriginState) => {
      state.type = "CREATE";
      state.id = undefined;
    }
  }
});

export const OriginReducer = OriginSlice.reducer;
export const OriginActions = OriginSlice.actions;
