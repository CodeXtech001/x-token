import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Message {
  id?: number;
  usergmail?: string;
  message?: string;
  sender?: "user" | "bot";
  timestamp?: string;
}

interface ChatbotState {
  messages: Message[];
  status: "idle" | "loading" | "failed";
}

const initialState: ChatbotState = {
  messages: [],
  status: "idle",
};

// Fetch messages
export const fetchMessages = createAsyncThunk(
  "chatbot/fetchMessages",
  async (usergmail: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/messages/?usergmail=${usergmail}`
    );
    if (!response.ok) throw new Error("Failed to fetch messages");
    return response.json();
  }
);

// Send a message
export const sendMessage = createAsyncThunk(
  "chatbot/sendMessage",
  async ({ usergmail, message }: { usergmail: string; message: string }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/messages/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usergmail, message, sender: "user" }),
      }
    );
    if (!response.ok) throw new Error("Failed to send message");
    return response.json();
  }
);

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.status = "idle";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export default chatbotSlice.reducer;
