import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseJokeUrl } from '../utility/constants';
import axios from 'axios';

export const fetchJokes = createAsyncThunk('jokes/fetchJokes', async (category = '', { rejectWithValue }) => {
  try {
    const response = await axios.get(category !== '' ? `${baseJokeUrl}?category=${category}` : baseJokeUrl);
    return response.data;
  } catch (error) {
    if (error?.response && error?.response?.status === 404) {
      return rejectWithValue(error?.response?.data?.message);
    } else {
      throw error;
    }
  }
});

const jokesSlice = createSlice({
  name: 'jokes',
  initialState: {
    jokes: [],
    status: 'idle',
    error: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchJokes.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(fetchJokes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jokes = action.payload;
        state.error = null;
    })
    .addCase(fetchJokes.rejected, (state, action) => {
        state.status = 'failed';
        state.jokes = [];
        state.error = action.payload;
    })
  },
});

export default jokesSlice.reducer;
