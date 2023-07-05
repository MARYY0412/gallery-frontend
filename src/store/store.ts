import { configureStore } from "@reduxjs/toolkit";
import { user_Slice } from "./slices/user_Slice";

export const store = configureStore({
  reducer: {
    user: user_Slice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
