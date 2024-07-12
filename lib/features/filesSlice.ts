import { RootState } from '@/lib/store';
import { createSlice } from '@reduxjs/toolkit';

interface File {
  id: string;
  userId: string;
  email: string;
  url: string;
  fileType: string;
  fileName: string;
  fileSize: number;
  createdAt: string;
  updatedAt: string;
}

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    files: [] as File[],
  },
  reducers: {
    addFiles: (state, action) => {
      state.files = [...state.files, ...action.payload];
    },
    updateFile: (state, action) => {
      const existingFileIndex = state.files.findIndex(
        (file: File) => file.id === action.payload.id,
      );
      if (existingFileIndex !== -1) {
        state.files[existingFileIndex] = action.payload;
      }
    },
  },
});

export const getAllFiles = (state: RootState) => state.files.files;
export const { addFiles, updateFile } = filesSlice.actions;
export const filesReducer = filesSlice.reducer;
