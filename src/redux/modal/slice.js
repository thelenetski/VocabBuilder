import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { logOut } from '../auth/operations';

export const modalTypes = {
  confirmLogOutUser: 'confirm-logout-user',
  addWord: 'add-word',
  editWord: 'edit-word',
  welldone: 'well-done',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    type: null,
    content: null,
  },
  reducers: {
    openConfirmLogOutUser(state, action) {
      state.isOpen = true;
      state.type = modalTypes.confirmLogOutUser;
      state.content = action.payload;
    },
    openAddWord(state, action) {
      state.isOpen = true;
      state.type = modalTypes.addWord;
      state.content = action.payload;
    },
    openEditWord(state, action) {
      state.isOpen = true;
      state.type = modalTypes.editWord;
      state.content = action.payload;
    },
    openWellDone(state, action) {
      state.isOpen = true;
      state.type = modalTypes.welldone;
      state.content = action.payload;
    },
    closeModal(state) {
      state.isOpen = false;
      state.type = null;
      state.content = null;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(isAnyOf(logOut.fulfilled), state => {
      state.isOpen = false;
      state.type = null;
      state.content = null;
    });
  },
});

// Експортуємо генератори екшенів та редюсер
export const {
  openConfirmLogOutUser,
  openAddWord,
  openEditWord,
  openWellDone,
  closeModal,
} = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
