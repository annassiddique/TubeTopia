import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async Thunk to fetch videos for voting
export const fetchVideos = createAsyncThunk(
  "votes/fetchVideos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}votes/`);
      if (!response.ok) throw new Error("Failed to fetch videos");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk to post vote results
export const postVote = createAsyncThunk(
  "votes/postVote",
  async (voteData, { rejectWithValue, getState }) => {
    try {
      const { videoA, videoB } = getState().votes; // Get the current video data from the Redux state
      // Construct the voteData to match the API format
      const votePayload = {
        videoAId: videoA._id,
        videoBId: videoB._id,
        winner: voteData.winner, // 'A' or 'B' based on user vote
      };
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}votes/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(votePayload),
      });
      if (!response.ok) throw new Error("Failed to submit vote");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const votesSlice = createSlice({
  name: "votes",
  initialState: {
    videoA: null,
    videoB: null,
    currentRound: 1,
    maxRounds: 10,
    status: "idle",
    error: null,
  },
  reducers: {
    resetRounds: (state) => {
      state.currentRound = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.videoA = action.payload.videoA;
        state.videoB = action.payload.videoB;
        state.status = "succeeded";
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(postVote.fulfilled, (state) => {
        state.currentRound += 1;
      });
  },
});

export const { resetRounds } = votesSlice.actions;

export default votesSlice.reducer;
