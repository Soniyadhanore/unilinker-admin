import { createSlice } from "@reduxjs/toolkit";

export const snackbar = createSlice({
  name: "snackbar",
  initialState: {
    value: {
      message: "message",
      isOpen: false,
      state: "warning", //error,success,warning
    },
  },
  reducers: {
    setSnackbar: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSnackbar } = snackbar.actions;
export const snackObj = (state) => state.snackbar.value;
export default snackbar.reducer;
