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
      `${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/bard/create-chat`,
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

export const ContinueAiChatAction = createAsyncThunk<
  Bard,
  { bardId: string; question: string },
  { rejectValue: SerializedError }
>(
  "aiChat/continue",
  async ({ bardId, question }, { rejectWithValue, getState }) => {
    const { users } = getState() as RootState;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${users?.user?.token}`,
      },
    };
    try {
      const { data } = await axios.put<Bard>(
        `${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/bard/${bardId}`,
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
  }
);

export const GetSingleAiChatAction = createAsyncThunk<
  Bard,
  string | undefined,
  { rejectValue: SerializedError }
>("aiChat/single", async (bardId, { rejectWithValue, getState }) => {
  const { users } = getState() as RootState;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${users?.user?.token}`,
    },
  };
  try {
    const { data } = await axios.get<Bard>(
      `${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/bard/${bardId}`,
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

export const GetAllAiChatsAction = createAsyncThunk<
  Bard,
  undefined,
  { rejectValue: SerializedError }
>("aiChat/all", async (_, { rejectWithValue, getState }) => {
  const { users } = getState() as RootState;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${users?.user?.token}`,
    },
  };
  try {
    const { data } = await axios.get<Bard>(
      `${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/bard`,
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
    // NewAiChatAction
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

    // ContinueAiChatAction
    builder.addCase(ContinueAiChatAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(ContinueAiChatAction.fulfilled, (state, action) => {
      state.loading = false;
      state.aiChat = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(ContinueAiChatAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.message;
      state.serverErr = action.error?.message;
    });

    // GetSingleAiChatAction
    builder.addCase(GetSingleAiChatAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(GetSingleAiChatAction.fulfilled, (state, action) => {
      state.loading = false;
      state.aiChat = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(GetSingleAiChatAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.message;
      state.serverErr = action.error?.message;
    });

    // GetAllAiChatsAction
    builder.addCase(GetAllAiChatsAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(GetAllAiChatsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.aiChat = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(GetAllAiChatsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.message;
      state.serverErr = action.error?.message;
    });
  },
});

export default aiChatSlice.reducer;
export const selectAiChat = (state: RootState) => state.aiChats;
