import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducers/themeReducer";
import userReducer from "./reducers/userReducer";
import aichatReducer from "./reducers/aichatReducer";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    users: userReducer,
    aiChats: aichatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
