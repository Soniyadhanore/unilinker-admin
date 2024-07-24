import { createSlice } from "@reduxjs/toolkit";

export const loader = createSlice({
  name: "loader",
  initialState: {
    value: false,
  },
  reducers: {
    changeLoader: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeLoader } = loader.actions;
export const currentLoader = (state) => state.loader.value;
export default loader.reducer;
