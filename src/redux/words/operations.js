import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCategories = createAsyncThunk(
  'words/getCategories',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('words/categories');
      return res.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message || 'Unknown error');
    }
  }
);

export const getAllWords = createAsyncThunk(
  'words/getAllWords',
  async ({ keyword, category, isIrregular, page, limit }, thunkAPI) => {
    try {
      const res = await axios.get('words/all', {
        params: { keyword, category, isIrregular, page, limit },
      });
      return res.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message || 'Unknown error');
    }
  }
);
