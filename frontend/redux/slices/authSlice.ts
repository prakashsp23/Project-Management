// import { createSlice } from "@reduxjs/toolkit";

// // Check if window is defined (client-side) before accessing localStorage
// const initialState = {
//   userInfo:
//     typeof window !== "undefined" && localStorage.getItem("userInfo")
//       ? JSON.parse(localStorage.getItem("userInfo")!)
//       : null,
//   projects:
//     typeof window !== "undefined" && localStorage.getItem("projects")
//       ? JSON.parse(localStorage.getItem("projects")!)
//       : null,
// };

// const authSlice = createSlice({
//   name: "user",
//   initialState: {
//     userInfo: null,
//     userType: null,
//   },
//   reducers: {
//     setCredentials: (state, action) => {
//       state.userInfo = action.payload;
//       state.userType = action.payload.userType;
//       // Ensure localStorage is available before using it
//       if (typeof window !== "undefined") {
//         localStorage.setItem("userInfo", JSON.stringify(action.payload));
//       }
//     },
//     setProjects: (state, action) => {
//       state.projects = action.payload;
//       if (typeof window !== "undefined") {
//         localStorage.setItem("projects", JSON.stringify(action.payload));
//       }
//     },
//     logout: (state, action) => {
//       state.userInfo = null;
//       state.projects = null;
//       // Ensure localStorage is available before using it
//       if (typeof window !== "undefined") {
//         localStorage.removeItem("userInfo");
//         localStorage.removeItem("projects");
//       }
//     },
//   },
// });

// export const { setCredentials, setProjects, logout } = authSlice.actions;

// export default authSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userInfo: any; // Define the type of userInfo as per your data structure
  projects: any; // Define the type of projects as per your data structure
  userType: string | null;
  currentProject: any; // Define the type of currentProjects as per your data structure
}

const initialState: AuthState = {
  userInfo: null,
  projects: null,
  userType: null,
  currentProject: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState["userInfo"]>) => {
      state.userInfo = action.payload;
      state.userType = action.payload.userType;
      if (typeof window !== "undefined") {
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      }
    },
    setProjects: (state, action: PayloadAction<AuthState["projects"]>) => {
      state.projects = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("projects", JSON.stringify(action.payload));
      }
    },
    // setCurrentProject: (state, action: PayloadAction<AuthState["currentProjects"]>) => {
    //   state.currentProjects = action.payload;
    //   if (typeof window !== "undefined") {
    //     localStorage.setItem("currentProjects", JSON.stringify(action.payload));
    //   }
    // },
    setCurrentProject: (state, action: PayloadAction<AuthState["currentProject"]>) => {
      state.currentProject = action.payload; // Update property name to match state
      if (typeof window !== "undefined") {
        localStorage.setItem("currentProject", JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.userInfo = null;
      state.projects = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("projects");
      }
    },
  },
});

export const { setCredentials, setProjects, logout,setCurrentProject } = authSlice.actions;

export default authSlice.reducer;