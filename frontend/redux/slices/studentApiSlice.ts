import { apiSlice } from "./apiSlice";
const USERS_URL = "/api";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/student/auth`,
        method: "Post",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;
