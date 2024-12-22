import { createAsyncThunk } from "@reduxjs/toolkit";


export const addVideo = createAsyncThunk(
  "video/addVideo",
  async (videoData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}videos`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add video");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchVideoById = createAsyncThunk(
  "video/fetchVideoById",
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}videos/${videoId}`
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch video");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete a video
export const deleteVideo = createAsyncThunk(
  "video/deleteVideo",
  async (videoId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}videos/${videoId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete video");
      }

      return videoId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
