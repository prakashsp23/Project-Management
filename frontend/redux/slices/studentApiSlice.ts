// import { apiSlice } from "./apiSlice";
// const USERS_URL = "/student";

// export const usersApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/auth`,
//         method: "POST",
//         body: data,
//       }),
//     }),
//     logout: builder.mutation({
//       query: () => ({
//         url: `${USERS_URL}/logout`,
//         method: "POST",
//       }),
//     }),
//     register: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/register`,
//         method: "POST",
//         body: data,
//       }),
//     }),
//   }),
// });

// export const { useLoginMutation, useLogoutMutation,useRegisterMutation } = usersApiSlice;
import { apiSlice } from "./apiSlice";
const STUDENT_URL = "/student";
const TEACHER_URL = "/teacher";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    studentLogin: builder.mutation({
      query: (data) => ({
        url: `${STUDENT_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    studentRegister: builder.mutation({
      query: (data) => ({
        url: `${STUDENT_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    teacherLogin: builder.mutation({
      query: (data) => ({
        url: `${TEACHER_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    teacherRegister: builder.mutation({
      query: (data) => ({
        url: `${TEACHER_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${STUDENT_URL}/logout`, // Adjust based on the logout endpoint
        method: "POST",
      }),
    }),
  }),
});

export const { useStudentLoginMutation, useStudentRegisterMutation, useTeacherLoginMutation, useTeacherRegisterMutation, useLogoutMutation } = usersApiSlice;