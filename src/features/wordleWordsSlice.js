import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    wordleWords: [],
    status: 'idle',
    error: null
}

export const fetchWordsByTopic = createAsyncThunk(
    'wordleWords/fetchWordsByTopic',
    async (topic, { rejectWithValue }) => {
      try {
        const response = await axios.get(`http://localhost:3500/WordleWordsList?topic=${encodeURIComponent(topic)}`);
        return response.data.words;
      } catch (error) {
        console.error("Error fetching words:", error);
        return rejectWithValue(error.message);
      }
    }
);

const wordleWordsSlice = createSlice({
    name: 'wordleWords',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWordsByTopic.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWordsByTopic.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.wordleWords = action.payload;
            })
            .addCase(fetchWordsByTopic.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export default wordleWordsSlice.reducer;
