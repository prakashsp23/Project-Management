import { createSlice } from "@reduxjs/toolkit";

// Check if window is defined (client-side) before accessing localStorage
const initialState = {
  userInfo:
    typeof window !== "undefined" && localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")!)
      : null,
  projects:
    typeof window !== "undefined" && localStorage.getItem("projects")
      ? JSON.parse(localStorage.getItem("projects")!)
      : null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      // Ensure localStorage is available before using it
      if (typeof window !== "undefined") {
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      }
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("projects", JSON.stringify(action.payload));
      }
    },
    logout: (state, action) => {
      state.userInfo = null;
      state.projects = null;
      // Ensure localStorage is available before using it
      if (typeof window !== "undefined") {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("projects");
      }
    },
  },
});

export const { setCredentials, setProjects, logout } = authSlice.actions;

export default authSlice.reducer;
