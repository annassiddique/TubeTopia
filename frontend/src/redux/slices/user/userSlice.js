import { createSlice } from "@reduxjs/toolkit";
import { signUpUser, loginUser, fetchUserInfo } from "./userAPI";

const initialState = {
  user: null,
  token: null,
  loading: false,
  success: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.success = "";
      state.error = "";
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.success = "";
      state.error = "";

      // Clear localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    // Handle sign up
    builder.addCase(signUpUser.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.success = action.payload.message;

      localStorage.setItem("authToken", action.payload.token);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle fetching user info
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;

      localStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(fetchUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearMessages, logout } = userSlice.actions;
export default userSlice.reducer;
