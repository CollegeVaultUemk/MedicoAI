/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios, { AxiosError } from "axios";

interface Bard {
  chat: {
    question: string | null | undefined;
    answer: string | null | undefined;
  }[];
  user: string;
}

interface SerializedError {
  response?: any;
  message?: string;
  name?: string;
  stack?: string;
  code?: string;
}

interface AiChatState {
  loading?: boolean;
  aiChat?: any;
  appErr?: string | undefined;
  serverErr?: string | undefined;
}

const initialState: AiChatState = {};

export const NewAiChatAction = createAsyncThunk<
  Bard,
  any,
  { rejectValue: SerializedError }
>("aiChat/new", async (question, { rejectWithValue, getState }) => {
  const { users } = getState() as RootState;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${users?.user?.token}`,
    },
  };
  try {
    const { data } = await axios.post<Bard>(
      "http://localhost:8000/api/v1/bard/create-chat",
      { question },
      config
    );
    return data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw error;
    }
    const axiosError = error as AxiosError<SerializedError>;
    if (axiosError.response) {
      return rejectWithValue(axiosError.response.data);
    } else {
      throw error;
    }
  }
});

const aiChatSlice = createSlice({
  name: "aiChat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(NewAiChatAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(NewAiChatAction.fulfilled, (state, action) => {
      state.loading = false;
      state.aiChat = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(NewAiChatAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.message;
      state.serverErr = action.error?.message;
    });
  },
});

export default aiChatSlice.reducer;
export const selectAiChat = (state: RootState) => state.aiChats;
