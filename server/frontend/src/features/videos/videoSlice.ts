import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of your video state
export interface VideoState {
  videos: Video[];
  loading: boolean;
  error: string | null;
}

// Define the shape of a Video object
export interface Video {
  id: number;
  title: string;
  url: string;
}

const initialState: VideoState = {
  videos: [],
  loading: false,
  error: null,
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    fetchVideosStart(state: VideoState) {
      state.loading = true;
      state.error = null;
    },
    fetchVideosSuccess(state: VideoState, action: PayloadAction<Video[]>) {
      state.loading = false;
      state.videos = action.payload;
    },
    fetchVideosFailure(state: VideoState, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchVideosStart,
  fetchVideosSuccess,
  fetchVideosFailure,
} = videoSlice.actions;

export default videoSlice.reducer;
