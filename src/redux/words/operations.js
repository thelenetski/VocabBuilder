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

export const getOwnWords = createAsyncThunk(
  'words/getOwnWords',
  async ({ keyword, category, isIrregular, page, limit }, thunkAPI) => {
    try {
      const res = await axios.get('words/own', {
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

export const getStatistics = createAsyncThunk(
  'words/getStatistics',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('words/statistics');
      return res.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message || 'Unknown error');
    }
  }
);

export const createWord = createAsyncThunk(
  'words/createWord',
  async (data, thunkAPI) => {
    try {
      const res = await axios.post('words/create', data);
      return res.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message || 'Unknown error');
    }
  }
);

export const deleteWord = createAsyncThunk(
  'words/deleteWord',
  async (id, thunkAPI) => {
    console.log(id);
    try {
      const res = await axios.delete(`words/delete/${id}`);
      return res.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message || 'Unknown error');
    }
  }
);
