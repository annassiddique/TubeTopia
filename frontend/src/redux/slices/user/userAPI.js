import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
      const response = await fetch("http://localhost:5000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token for auth
          "Content-Type": "application/json", // Specify content type
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      return data; // Return user data { name, email, videos }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      return {
        message: "Registration successful!",
        email: formData.email,
        password: formData.password,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Login a user
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      // Save token to localStorage
      localStorage.setItem("authToken", data.token.accessToken);
      return { token: data.token.accessToken, message: "Login successful!" };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
