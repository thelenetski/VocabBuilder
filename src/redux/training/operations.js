import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTasks = createAsyncThunk(
  'training/getTasks',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('words/tasks');
      return res.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message || 'Unknown error');
    }
  }
);

export const sendAnswers = createAsyncThunk(
  'training/sendAnswers',
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`words/answers`, data);
      return res.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message || 'Unknown error');
    }
  }
);
