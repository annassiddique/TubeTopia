import { createSlice } from "@reduxjs/toolkit";
import {
  addVideo,
  fetchVideoById,
  deleteVideo,
} from "./videoAPI";

const initialState = {
  videos: [],
  selectedVideo: null,
  loading: false,
  success: "",
  error: "",
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    clearVideoMessages: (state) => {
      state.success = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    // Handle adding a video
    builder.addCase(addVideo.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addVideo.fulfilled, (state, action) => {
      state.loading = false;
      state.success = "Video added successfully!";
      state.videos.push(action.payload);
    });
    builder.addCase(addVideo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle fetching a single video by ID
    builder.addCase(fetchVideoById.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchVideoById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedVideo = action.payload;
    });
    builder.addCase(fetchVideoById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle deleting a video
    builder.addCase(deleteVideo.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteVideo.fulfilled, (state, action) => {
      state.loading = false;
      state.success = "Video deleted successfully!";
      state.videos = state.videos.filter(
        (video) => video.id !== action.payload
      );
    });
    builder.addCase(deleteVideo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearVideoMessages } = videoSlice.actions;
export default videoSlice.reducer;
