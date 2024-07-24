// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import loader from "./reducers/loader";
import snackbar from "./reducers/snackbar";

const store = configureStore({
  reducer: {
    loader: loader,
    snackbar: snackbar,
  },
});

export default store;
