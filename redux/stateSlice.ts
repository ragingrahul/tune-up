"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pkh: "",
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setPkh: (state, action) => {
      state.pkh = action.payload;
    },
  },
});

export const { setPkh } = stateSlice.actions;

export default stateSlice.reducer;
