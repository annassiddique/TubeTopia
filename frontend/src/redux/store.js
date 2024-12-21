import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/userSlice";
import votesReducer from "./slices/vote/votesSlice";
import videoReducer from "./slices/videos/videoSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    votes: votesReducer,
    videos: videoReducer,
  },
});

export default store;
